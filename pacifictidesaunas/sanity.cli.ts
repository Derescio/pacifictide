import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '38lh95pm',
    dataset: 'production'
  },
  deployment: {
    appId: 'uzc0c1o3zg9wkokc528f4got',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
