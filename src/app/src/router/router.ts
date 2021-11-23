import { useEffect } from 'react';

enum NavigationEvent {
  NAVIGATE = 'NAVIGATE'
}

const navigationEventTarget = new EventTarget();

export const navigate = (path: string, data?: object) => {
  history.pushState(data, null, path);
  const event = new CustomEvent(NavigationEvent.NAVIGATE);
  navigationEventTarget.dispatchEvent(event);
};

export const useLocation = (cb: (path: string, state: object) => void) => {
  useEffect(() => {
    const notify = () => {
      cb(location.pathname, history.state);
    };

    const subscribeToNavigation = () => {
      navigationEventTarget.addEventListener(NavigationEvent.NAVIGATE, notify);
    };

    notify();
    subscribeToNavigation();
  }, []);
}