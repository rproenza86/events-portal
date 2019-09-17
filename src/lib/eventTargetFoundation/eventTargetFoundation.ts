/**
 * Class representing the events broker agent
 *
 * Abstraction needed because there are more than two ways to
 * handle Custom Events.
 *
 * Ex:
 * ```js
 *    window.dispatchEvent(...);
 *
 *    document.dispatchEvent(...);
 *
 *    element.dispatchEvent(...);
 *
 *    new EventTarget().dispatchEvent(...)
 * ```
 *
 * This class creates the API to use an unique interface implementation
 * for the Publish/Subscribe Design Pattern sitting on top of the standard
 * Custom Events Web API.
 *
 */
export class EventTargetFoundation {
  /* Broker events abstraction interface */
  private readonly eventTarget: EventTarget = {
    addEventListener: window.addEventListener,
    dispatchEvent: window.dispatchEvent,
    removeEventListener: window.removeEventListener
  };

  /**
   * Method to publish/dispatch events
   *
   * @param {Event | CustomEvent} event The event to publish.
   * @return {boolean} The publish result.
   */
  public publishEvent(event: Event | CustomEvent): boolean {
    return this.eventTarget.dispatchEvent(event);
  }

  /**
   * Method to subscribe/register a listener to a given event
   *
   * @param {string} type The event type/name to which the client wants to be subscribed.
   * @param {function} listener Callback function to invoke each time the event of interest is published
   * @param {boolean | object} options Subscription configuration. Optional.
   */
  public subscribeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ): void {
    return this.eventTarget.addEventListener(type, listener, options);
  }

  /**
   * Method to un-subscribe/un-register a listener to a given event
   *
   * @param {string} type The event type/name to which the client wants to be un-subscribed.
   * @param {function} listener Callback function to invoke each time the event of interest is published. Same used on subscription time.
   * @param {boolean | object} options Subscription configuration. Optional. Same used on subscription time.
   */
  public unsubscribeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void {
    return this.eventTarget.removeEventListener(type, callback, options);
  }
}
