namespace ToastSpace {
  enum ToastType {
    /**
     * Secondary
     */
    SECONDARY = 'secondary',
    /**
     * System
     */
    SYSTEM = 'system',
  }

  /**
   * Toast type key.
   */
  type ToastTypeKey = keyof typeof ToastType

  /**
   * Appear position.
   */
  type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom'

  /**
   * Toast props.
   */
  interface Prop {
    /**
     * Toast message.
     */
    message: string
    /**
     * Toast position.
     */
    position?: ToastSpace.Position
    /**
     * Toast type.
     */
    type?: ToastSpace.ToastType & SiteStatus
    /**
     * Toast duration.
     */
    duration?: number
    /**
     *
     * Toast title.
     */
    title?: string
  }

  /**
   * Toast instance.
   */
  interface ActiveToast {
    /**
     * Component dismiss.
     */
    dismiss(): void
  }
}
