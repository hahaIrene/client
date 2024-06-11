import { FileTreeType } from '@/containers/setting/LayerEditorContainer/EditorProvider'

export type LayerTreeQuery = {
  ResponseType: {
    id: string
    code: string
    content: string | null
    updatedAt: string
  }
  ParamType: {
    code: FileTreeType
    orgCode: string
  }
}

export type LayerTreeUpdateMutation = {
  ResponseType: {
    id: string
  }
  ParamType: {
    token: string
    orgCode: string
    code: FileTreeType
    content: string
  }
}
