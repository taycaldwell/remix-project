// eslint-disable-next-line no-use-before-define
import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { InstanceContainerProps } from '../types'
import { UniversalDappUI } from './universalDappUI'

export function InstanceContainerUI (props: InstanceContainerProps) {
  const { instanceList } = props.instances

  const clearInstance = () => {
    props.clearInstances()
  }

  return (
    <div className="udapp_instanceContainer mt-3 border-0 list-group-item">
      <div className="d-flex justify-content-between align-items-center pl-2 mb-2">
        <OverlayTrigger
          placement="top-start"
          overlay={
            <Tooltip className="text-nowrap" id="deployAndRunClearInstancesTooltip">
              <span>{"Autogenerated generic user interfaces for interaction with deployed contracts"}</span>
            </Tooltip>
          }
        >
          <label className="udapp_deployedContracts">
            Deployed Contracts
          </label>
        </OverlayTrigger>
        { instanceList.length > 0
            ? (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip className="text-nowrap" id="deployAndRunClearInstancesTooltip">
                  <span>{"Clear instances list and reset recorder"}</span>
                </Tooltip>
              } 
            >
              <i className="mr-2 udapp_icon far fa-trash-alt" data-id="deployAndRunClearInstances" onClick={clearInstance} aria-hidden="true">
              </i>
            </OverlayTrigger>
            ) : null
          }
      </div>
      { instanceList.length > 0
        ? <div> { props.instances.instanceList.map((instance, index) => {
          return <UniversalDappUI
            key={instance.address}
            instance={instance}
            context={props.getContext()}
            removeInstance={props.removeInstance}
            index={index}
            gasEstimationPrompt={props.gasEstimationPrompt}
            passphrasePrompt={props.passphrasePrompt}
            mainnetPrompt={props.mainnetPrompt}
            runTransactions={props.runTransactions}
            sendValue={props.sendValue}
            getFuncABIInputs={props.getFuncABIInputs}
          />
        }) }
        </div>
        : <span className="mx-2 mt-3 alert alert-warning" data-id="deployAndRunNoInstanceText" role="alert">
          Currently you have no contract instances to interact with.
        </span>
      }
    </div>
  )
}
