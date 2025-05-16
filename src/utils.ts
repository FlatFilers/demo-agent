import api, { type Flatfile } from '@flatfile/api'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const addStoredConstraints = async (
  spaceId: string,
  constraints: Omit<Flatfile.ConstraintCreate, 'appId'>[],
) => {
  const { data: space } = await api.spaces.get(spaceId)
  if (!space.appId) {
    console.error('Space does not have an appId')
    return
  }
  const { data: existingConstraints } = await api.apps.getConstraints(space.appId)
  for (const constraint of constraints) {
    const existingConstraint = existingConstraints.find((c) => c.validator === constraint.validator)
    if (existingConstraint) {
      await api.apps.updateConstraint(space.appId, existingConstraint.id, { ...constraint })
    } else {
      await api.apps.createConstraint(space.appId, { ...constraint, appId: space.appId })
    }
  }
}

export const setDefaultPage = async ({ spaceId, documentTitle }: { spaceId: string; documentTitle: string }) => {
  const { data } = await api.documents.list(spaceId)
  const document = data.find((document) => document.title === documentTitle)
  const { data: space } = await api.spaces.get(spaceId)
  await api.spaces.update(spaceId, {
    environmentId: document?.environmentId,
    metadata: {
      ...space.metadata,
      sidebarConfig: {
        defaultPage: { documentId: document?.id },
      },
    },
  })
}

export const uploadFiles = async (createFileRequest: Flatfile.CreateFileRequest, files: string[]) => {
  for (const fileUrl of files) {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const filename = fileUrl.substring(fileUrl.lastIndexOf('/') + 1)
      const file = new File([blob], filename, { type: blob.type })
      await api.files.upload(file, createFileRequest)
    } catch (error) {
      console.error('Error uploading file:', (error as unknown as Error).stack)
    }
  }
}

export const addGuides = async (
  environmentId: string,
  guides: Omit<Flatfile.GuideCreateRequest, 'environmentId'>[],
) => {
  const { data: existingGuides } = await api.environments.listGuides(environmentId)

  // Guides live at the environment level. If it already exists, update it.
  for (const guide of guides) {
    try {
      const existingGuide = existingGuides.find((g) => g.slug === guide.slug)
      if (!existingGuide) {
        await api.environments.createGuide(environmentId, {
          environmentId,
          ...guide,
        })
      } else {
        await api.environments.updateGuide(environmentId, existingGuide.id, {
          ...guide,
        })
      }
    } catch (error) {
      console.error('Error creating guide:', (error as unknown as Error).stack)
    }
  }
}

export const addGuidances = async (environmentId: string, guidances: Flatfile.GuidanceApiCreateData[]) => {
  const { data: existingGuidances } = await api.spaces.listGuidance(environmentId)
  for (const guidance of guidances) {
    try {
      const existingGuidance = existingGuidances.find((g) => g.guideSlug === guidance.guideSlug)
      if (!existingGuidance) {
        await api.spaces.createGuidance(environmentId, guidance)
      } else {
        await api.spaces.updateGuidance(environmentId, existingGuidance.id, guidance)
      }
    } catch (error) {
      console.error('Error creating guidance:', (error as unknown as Error).stack)
    }
  }
}
