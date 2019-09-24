// Use constants to get the supported notifications strategies
export * from './lib/constants';

// Use EventPortalFactory to create an EventPortal instance
export {
  EventPortalFactory
} from './lib/factories/eventPortalFactory/eventPortalFactory';

// Use AppsPortal to create 1...* AppEventsPortals instances with centralized traces system
export { AppsPortal } from './lib/appsPortal/appsPortal';
