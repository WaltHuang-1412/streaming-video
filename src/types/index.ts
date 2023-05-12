export * from './api'

declare global {
  interface Window {
    Cesium: any
    Sandcastle: any
  }
}
