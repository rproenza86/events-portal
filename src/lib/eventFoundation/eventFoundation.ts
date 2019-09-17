export interface EventFoundationConstructorParams {
  readonly eventType: string;
  readonly eventPayload?: {
    readonly [key: string]: any;
  };
}

/**
 * Class representing a Custom Event.
 * @class
 */
export class EventFoundation {
  private event: CustomEvent;

  /**
   * Creates a Custom Event.
   *
   * @param {string} eventType - The event type/name value.
   * @param {object} eventPayload - The payload object to send on the `event.detail` property.
   */
  constructor({
    eventType,
    eventPayload = {}
  }: EventFoundationConstructorParams) {
    if (!eventType) {
      throw new Error(
        'Error instantiating EventFoundation\'s class. Missing "eventType" param.'
      );
    }

    this.event = new CustomEvent(eventType, { detail: eventPayload });
  }

  /**
   * Get the event type/name value.
   * @return {string} The event type/name value.
   */
  get eventType(): string {
    return this.event.type;
  }

  /**
   * Get the event payload object.
   * @return {object} The event payload object.
   */
  get eventPayload(): any {
    return this.event.detail;
  }

  /**
   * Get the custom event object.
   * @return {CustomEvent} The custom event object.
   */
  getEvent(): CustomEvent {
    return this.event;
  }
}
