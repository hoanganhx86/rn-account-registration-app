import {useEffect, useRef} from 'react';

export default function useUpdateProfiler(name = '', props: any) {
  const previousProps = useRef<any>({});

  useEffect(() => {
    if (__DEV__ && previousProps.current) {
      const allKeys = Object.keys({...previousProps.current, ...props});
      const changesObj = {} as any;
      allKeys.forEach(key => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[update-profiler]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}
