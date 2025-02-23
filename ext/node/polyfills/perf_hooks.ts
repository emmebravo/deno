// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
import { notImplemented } from "ext:deno_node/_utils.ts";
import {
  performance as shimPerformance,
  PerformanceEntry,
} from "ext:deno_web/15_performance.js";

// FIXME(bartlomieju)
const PerformanceObserver = undefined;
const constants = {};

const performance:
  & Omit<
    Performance,
    "clearMeasures" | "getEntries" | "getEntriesByName" | "getEntriesByType"
  >
  & {
    // deno-lint-ignore no-explicit-any
    eventLoopUtilization: any;
    nodeTiming: Record<string, string>;
    // deno-lint-ignore no-explicit-any
    timerify: any;
    // deno-lint-ignore no-explicit-any
    timeOrigin: any;
    // deno-lint-ignore no-explicit-any
    markResourceTiming: any;
  } = {
    clearMarks: (markName: string) => shimPerformance.clearMarks(markName),
    eventLoopUtilization: () =>
      notImplemented("eventLoopUtilization from performance"),
    mark: (markName: string) => shimPerformance.mark(markName),
    measure: (
      measureName: string,
      startMark?: string | PerformanceMeasureOptions,
      endMark?: string,
    ): PerformanceMeasure => {
      if (endMark) {
        return shimPerformance.measure(
          measureName,
          startMark as string,
          endMark,
        );
      } else {
        return shimPerformance.measure(
          measureName,
          startMark as PerformanceMeasureOptions,
        );
      }
    },
    nodeTiming: {},
    now: () => shimPerformance.now(),
    timerify: () => notImplemented("timerify from performance"),
    // deno-lint-ignore no-explicit-any
    timeOrigin: (shimPerformance as any).timeOrigin,
    markResourceTiming: () => {},
    // @ts-ignore waiting on update in `deno`, but currently this is
    // a circular dependency
    toJSON: () => shimPerformance.toJSON(),
    addEventListener: (
      ...args: Parameters<typeof shimPerformance.addEventListener>
    ) => shimPerformance.addEventListener(...args),
    removeEventListener: (
      ...args: Parameters<typeof shimPerformance.removeEventListener>
    ) => shimPerformance.removeEventListener(...args),
    dispatchEvent: (
      ...args: Parameters<typeof shimPerformance.dispatchEvent>
    ) => shimPerformance.dispatchEvent(...args),
  };

const monitorEventLoopDelay = () =>
  notImplemented(
    "monitorEventLoopDelay from performance",
  );

export default {
  performance,
  PerformanceObserver,
  PerformanceEntry,
  monitorEventLoopDelay,
  constants,
};

export {
  constants,
  monitorEventLoopDelay,
  performance,
  PerformanceEntry,
  PerformanceObserver,
};
