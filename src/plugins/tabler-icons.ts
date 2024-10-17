import * as Icons from '@tabler/icons-vue'

export default {
  install(app: any) {
    // Register all Tabler icons globally
    for (const [key, iconComponent] of Object.entries(Icons)) {
      app.component(key, iconComponent)
    }
  }
}
