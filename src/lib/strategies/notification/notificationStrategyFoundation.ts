/**
 * Abstract class to encapsulate the structure and methods of the
 * notifications strategies.
 */
export abstract class NotificationStrategyFoundation {
  // Property to store the listener callback function to invoke on events publishing
  protected readonly callBack: (event: any) => void;

  /**
   * Creates the @NotificationStrategyFoundation object.
   *
   * @param {object} callBack - Callback function or object to use on events' publishing time
   */
  constructor(callBack: (event: any) => void) {
    this.callBack = callBack;
  }

  /**
   * Abstract method invoked when published an event to which the listener is registered.
   *
   * @param {CustomEvent} event - Published event to send to the listener
   */
  public abstract onNotification(event: CustomEvent): void;

  /**
   * Abstract method that return the event strategy name.
   */
  public abstract getStrategyName(): string;
}
