import LinearGauge from '@/components/LinearGauge'
import { IAppInfo } from '@/stores/types/api/app'
import { PlanCodeMap } from '@/stores/types/api/plan'
import React from 'react'

const AppBasicInfo = ({ appHealth }: { appHealth: IAppInfo | undefined }) => {
  return (
    <div>
      {appHealth ? (
        <div className="flex flex-col gap-4">
          <div className="stats calcite-box">
            <div className="stat">
              <div className="stat-title">組織名稱</div>
              <div className="stat-value">{appHealth.org.name}</div>
            </div>
            <div className="stat">
              <div className="stat-title">組織代碼</div>
              <div className="stat-value text-3xl">{appHealth.org.code}</div>
            </div>
          </div>
          <div className="stats calcite-box">
            <div className="stat">
              <div className="stat-title">當前方案</div>
              <div className="stat-value">
                {PlanCodeMap[appHealth.plan.plan.code].title}
              </div>
              <div className="stat-desc">
                {PlanCodeMap[appHealth.plan.plan.code].desc}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">使用者用量</div>
              <div className="stat-value text-3xl h-[40px]">
                <LinearGauge
                  value={appHealth.users.length}
                  max={appHealth.plan.plan.user}
                />
              </div>
              <div className="stat-desc">
                還能新建{appHealth.plan.plan.user - appHealth.users.length}
                位使用者
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">WMTS圖層用量</div>
              <div className="stat-value text-3xl h-[40px]">
                {appHealth.plan.plan.wmtsLayer ? (
                  <LinearGauge
                    value={appHealth.wmtsLayers.length}
                    max={appHealth.plan.plan.wmtsLayer}
                  />
                ) : (
                  '無限制'
                )}
              </div>
              <div className="stat-desc">
                {appHealth.plan.plan.wmtsLayer
                  ? `還能新增${appHealth.plan.plan.wmtsLayer - appHealth.wmtsLayers.length}份WMTS圖層`
                  : '無限制'}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">故事地圖用量</div>
              <div className="stat-value text-3xl h-[40px]">
                {appHealth.plan.plan.tgosLayer ? (
                  <LinearGauge
                    value={appHealth.storyLayers.length}
                    max={appHealth.plan.plan.tgosLayer}
                  />
                ) : (
                  '無限制'
                )}
              </div>
              <div className="stat-desc">
                {appHealth.plan.plan.tgosLayer
                  ? `還能新增${appHealth.plan.plan.tgosLayer - appHealth.storyLayers.length}份故事地圖`
                  : '無限制'}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">向量圖層用量</div>
              <div className="stat-value text-3xl h-[40px]">
                {appHealth.plan.plan.vectorLayer ? (
                  <LinearGauge
                    value={appHealth.vectorLayers.length}
                    max={appHealth.plan.plan.vectorLayer}
                  />
                ) : (
                  '無限制'
                )}
              </div>
              <div className="stat-desc">
                {appHealth.plan.plan.vectorLayer
                  ? `還能新增${appHealth.plan.plan.vectorLayer - appHealth.vectorLayers.length}份向量圖層`
                  : '無限制'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="skeleton w-full h-[240px]"></div>
      )}
    </div>
  )
}

export default AppBasicInfo
