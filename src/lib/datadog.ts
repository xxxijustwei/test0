import { datadogRum } from "@datadog/browser-rum";

let isInitialized = false;

export function initDatadog() {
  if (typeof window === "undefined" || isInitialized) {
    return;
  }

  datadogRum.init({
    applicationId: process.env.DATADOG_APPLICATION_ID || "",
    clientToken: process.env.DATADOG_CLIENT_TOKEN || "",
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: "datadoghq.com",
    service: "test0",
    env: process.env.NODE_ENV || "development",
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    defaultPrivacyLevel: "mask-user-input",
  });

  datadogRum.startSessionReplayRecording();
  isInitialized = true;
}

export function trackRequest(pathname: string, method: string = "GET") {
  if (typeof window === "undefined" || !isInitialized) {
    return;
  }

  datadogRum.addAction("request", {
    count: 1,
    path: pathname,
    method: method,
  });

  datadogRum.addAction("nuts.request.count", {
    type: "custom",
    name: "nuts.request.count",
    context: {
      path: pathname,
      method: method,
    },
  });
}
