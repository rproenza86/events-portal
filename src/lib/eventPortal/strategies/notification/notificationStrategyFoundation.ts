/**
 * class for ..
 */
export abstract class NotificationStrategyFoundation {
  protected eventsHook: any;
  protected readonly callBack: (event: any) => void;

  constructor(callBack: (event: any) => void) {
    this.callBack = callBack;
  }

  public abstract onNotification(event: CustomEvent): void;

  public abstract getStrategyName(): string;
}
