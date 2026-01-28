import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Input } from "../common/ui/input";
import { apiClient } from "@/src/utils/httpClient";
import { buses } from "@/src/utils/endpoints";

// Yup Schema definition
const busSchema = Yup.object().shape({
  matriculation_code: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  registration_number: Yup.string()
    .min(3, "Must be at least 3 characters")
    .required("Required"),
  category: Yup.string().oneOf(["classic", "vip", "vvip"]).required("Required"),
  insurance_expiry: Yup.string().optional(),
  total_seats: Yup.number()
    .min(1, "Must have at least 1 seat")
    .required("Required"),
  columns: Yup.number()
    .min(1, "Must have at least 1 column")
    .required("Required"),
  back_seat_count: Yup.number().default(0),
  bus_image: Yup.string().optional(),
  has_ac: Yup.boolean().default(false),
  has_wifi: Yup.boolean().default(false),
  has_toilet: Yup.boolean().default(false),
  has_tv: Yup.boolean().default(false),
});

interface AddBusFormProps {
  onClose: () => void;
}

export const AddBusForm = ({ onClose }: AddBusFormProps) => {
  const formik = useFormik({
    initialValues: {
      matriculation_code: "",
      registration_number: "",
      category: "classic",
      insurance_expiry: "",
      total_seats: 70,
      columns: 4,
      back_seat_count: 5,
      bus_image: "",
      has_ac: false,
      has_wifi: false,
      has_toilet: false,
      has_tv: false,
    },
    validationSchema: busSchema,
    onSubmit: async (values) => {
      try {
        // Prepare the data to match the Django model structure
        const formData = new FormData();

        // Add basic fields
        formData.append("matriculation_code", values.matriculation_code);
        formData.append("registration_number", values.registration_number);
        formData.append("category", values.category);
        formData.append("total_seats", values.total_seats.toString());
        formData.append("columns", values.columns.toString());
        formData.append("back_seat_count", values.back_seat_count.toString());

        // Add boolean fields
        formData.append("has_toilet", values.has_toilet.toString());
        formData.append("has_ac", values.has_ac.toString());
        formData.append("has_tv", values.has_tv.toString());
        formData.append("has_wifi", values.has_wifi.toString());

        // Add optional fields
        if (values.insurance_expiry) {
          formData.append("insurance_expiry", values.insurance_expiry);
        }

        // Handle image upload
        if (values.bus_image && values.bus_image.startsWith("data:")) {
          // Convert base64 to blob
          const response = await fetch(values.bus_image);
          const blob = await response.blob();
          const file = new File([blob], "bus_image.jpg", {
            type: "image/jpeg",
          });
          formData.append("image", file);
        }

        // Create features array based on boolean fields
        const features = [];
        if (values.has_toilet) features.push("toilet");
        if (values.has_ac) features.push("ac");
        if (values.has_tv) features.push("tv");
        if (values.has_wifi) features.push("wifi");
        formData.append("features", JSON.stringify(features));
        const response = await apiClient.post(buses, formData);
        console.log(response);

        // TODO: Replace with actual API call
        // const response = await fetch('/api/buses/', {
        //   method: 'POST',
        //   body: formData,
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to create bus');
        // }

        // console.log("Bus data prepared:", formData);
        toast.success("Bus registered successfully");
        // onClose();
      } catch (error) {
        console.error("Error creating bus:", error);
        toast.error("Failed to register bus");
      }
    },
  });

  const isSubmitting = formik.isSubmitting;

  return (
    <div
      id="add-bus-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/10"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-800">Register New Bus</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600 text-sm uppercase">
                Identification
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Matriculation Code
                </label>
                <Input
                  id="matriculation_code"
                  name="matriculation_code"
                  type="text"
                  placeholder="e.g. LT-123-XY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.matriculation_code}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 ${
                    formik.touched.matriculation_code &&
                    formik.errors.matriculation_code
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.matriculation_code &&
                  formik.errors.matriculation_code && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.matriculation_code}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <Input
                  name="registration_number"
                  type="text"
                  placeholder="e.g. ABC123"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.registration_number}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 ${
                    formik.touched.registration_number &&
                    formik.errors.registration_number
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.registration_number &&
                  formik.errors.registration_number && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.registration_number}
                    </p>
                  )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                >
                  <option value="classic">Classic</option>
                  <option value="vip">VIP</option>
                  <option value="vvip">VVIP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Insurance Expiry
                </label>
                <Input
                  name="insurance_expiry"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.insurance_expiry}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600 text-sm uppercase">
                Seating & Layout
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Total Seats
                  </label>
                  <Input
                    name="total_seats"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.total_seats}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 ${
                      formik.touched.total_seats && formik.errors.total_seats
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.total_seats && formik.errors.total_seats && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.total_seats}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Columns
                  </label>
                  <Input
                    name="columns"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.columns}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 ${
                      formik.touched.columns && formik.errors.columns
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.columns && formik.errors.columns && (
                    <p className="text-red-500 text-xs mt-1">
                      {formik.errors.columns}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Back Seat Count
                </label>
                <Input
                  name="back_seat_count"
                  type="number"
                  placeholder="Usually 5"
                  onChange={formik.handleChange}
                  value={formik.values.back_seat_count}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Number of seats in the final row.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bus Image
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          formik.setFieldValue("bus_image", reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formik.values.bus_image && (
                    <div className="mt-3">
                      <img
                        src={formik.values.bus_image}
                        alt="Bus preview"
                        className="h-32 w-auto rounded-md border border-gray-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => formik.setFieldValue("bus_image", "")}
                        className="mt-2 text-sm text-red-600 hover:text-red-700"
                      >
                        Remove image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2 border-t pt-4">
              <h4 className="font-semibold text-blue-600 text-sm uppercase mb-3">
                Amenities & Features
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="inline-flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Input
                    name="has_ac"
                    type="checkbox"
                    checked={formik.values.has_ac}
                    onChange={formik.handleChange}
                    className="rounded text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Air Conditioning
                  </span>
                </label>
                <label className="inline-flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Input
                    name="has_wifi"
                    type="checkbox"
                    checked={formik.values.has_wifi}
                    onChange={formik.handleChange}
                    className="rounded text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Free WiFi</span>
                </label>
                <label className="inline-flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Input
                    name="has_toilet"
                    type="checkbox"
                    checked={formik.values.has_toilet}
                    onChange={formik.handleChange}
                    className="rounded text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Toilet</span>
                </label>
                <label className="inline-flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <Input
                    name="has_tv"
                    type="checkbox"
                    checked={formik.values.has_tv}
                    onChange={formik.handleChange}
                    className="rounded text-blue-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Television</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3 sticky bottom-0 bg-white py-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Bus"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
