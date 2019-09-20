import { AnyAction, Store } from 'redux';
import { NotificationStrategy } from '../../../constants';
import { NotificationStrategyFoundation } from './notificationStrategyFoundation';

/**
 * Class representing the listeners notification solution.
 *
 * Abstraction supporting Redux API.
 *
 * Ex: Given an event publication the listener will be notified via
 * ```js
 *    listenerStore.dispatch(eventData);
 * ```
 */
export class ReduxStrategy extends NotificationStrategyFoundation {
  /**
   * Creates the @ReduxStrategy object.
   *
   * @param {object} store - Redux store or Redux's store API compatible object
   */
  constructor(store: Store) {
    super(store.dispatch);
  }

  /**
   * Method invoked when published an event to which the listener is registered.
   *
   * @param {CustomEvent} event - Published event to send to the listener
   */
  // Declarative expression needed to allow function execution as callback avoiding scoping problems
  public onNotification = (event: CustomEvent): void => {
    this.callBack(this.createAction(event));
  };

  /**
   * Method that return the event strategy name.
   */
  public getStrategyName(): string {
    return NotificationStrategy.REDUX;
  }

  /**
   * Method to creates Redux's actions from Custom Events.
   *
   * @param {CustomEvent} event - Event to be adapted into a Redux's action
   */
  private createAction(event: CustomEvent): AnyAction {
    const action: AnyAction = { type: event.type, ...event.detail };
    return action;
  }
}
