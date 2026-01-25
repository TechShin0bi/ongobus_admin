"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/libs/utils"
import Image, { ImageProps } from "next/image"

/**
 * Avatar Root Styles
 * 'overflow-hidden' is crucial here so the Image doesn't 
 * bleed out of the rounded corners.
 */
const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-24 w-24",
        "3xl": "h-32 w-32", // Added for the Profile Page
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, className }))}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

/**
 * AvatarImage component
 * Using 'fill' is the cleanest way to handle Next.js Images 
 * inside a fixed-size parent container.
 */
interface AvatarImageProps extends Omit<ImageProps, 'fill' | 'alt'> {
  alt?: string
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, ...props }, ref) => (
    <Image
      ref={ref}
      alt={alt || "Avatar"}
      fill
      className={cn("aspect-square object-cover h-full w-full", className)}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

/**
 * AvatarFallback component
 * Centered text/icon for when the image isn't available.
 */
const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }