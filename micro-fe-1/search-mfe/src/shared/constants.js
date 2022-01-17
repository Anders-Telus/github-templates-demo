export const PROFILE_DATA = {
  currentCustomer: {
    firstLevelTab: 'Overview',
    secondLevelTab: {
      Overview: '',
      Billing: 'transactions',
      Profile: 'personal'
    },
    isTabCreate: true,
    lineOfBusiness: 'mobility',
    name: 'AASAM AAHAM',
    triggerAnimation: false,
    adobe: {
      pushedProductSummaryBanList: ['70873913'],
      pushedProductDetailsIdList: []
    },
    tabUniqId: '70873913_mobility',
    billingAcctNum: '70873913',
    customerId: '70873913',
    template: 'profile',
    id: 2,
    currentView: 'profile'
  },
  banSummary: {
    mobility: [
      {
        fetchingLinkedAcctStartedAt: 1625492717988,
        mobBusinessContact: '',
        customerPrimaryContactEmail: '',
        billingAccountDate: '2019-05-22',
        billingAcctStatus: 'Tentative',
        mobHomeContact: '4162039804',
        connectedAttempted: true,
        billingAccountNameExt: { firstName: 'AASAM', lastName: 'AAHAM' },
        parentId: '70873913_mobility',
        billingTypeSubtype: { type: 'I', subtype: 'R' },
        driversLicence: '*******9808',
        contactNum: 'hidden',
        brand: 'telus',
        billingAcctType: 'TELUS Mobility - Consumer',
        billingAddressExt: {
          primaryLineTxt: '10150 JASPER AV NW',
          streetNum: '10150',
          streetName: 'JASPER AV NW',
          cityName: 'EDMONTON',
          provinceCode: 'AB',
          postalCode: 'T5J1W4',
          countryCode: 'CAN'
        },
        isErrorSummary: false,
        isProfileError: false,
        isSelectedBan: true,
        isErrorConnected: false,
        lineOfBusiness: 'mobility',
        birthDate: '*** *** 2000',
        authorizedUsers: [''],
        isFetchingIdentities: false,
        fetchIdentitiesErr: false,
        billingAddressSearchTxt: '10150 JASPER AV NW EDMONTON AB',
        customerPortalEmail: '',
        isFetchingSummary: true,
        isParent: true,
        pin: '1234',
        fetchingSummaryStartedAt: 1625492718017,
        isFetchingConnected: false,
        sin: '*** *** 982',
        transBillingAcctStatus: 'Open',
        billingAcctNum: '70873913',
        contactPhoneNum: '4162039804',
        billingAddress: '10150 JASPER AV NW EDMONTON AB CAN T5J1W4',
        customerId: '70873913',
        preferredLanguage: 'en',
        fetchingLinkedAcctEndAt: 1625492720161,
        billingAccountName: 'AASAM AAHAM'
      }
    ],
    ffh: []
  },
  isTaskOpen: false,
  updateIsSelectedBan: () => {},
  isNoteFormWindowOpen: false
}

export const parentBan = {
  fetchingLinkedAcctStartedAt: 1625494863581,
  mobBusinessContact: '',
  customerPrimaryContactEmail: '',
  billingAccountDate: '2019-05-22',
  billingAcctStatus: 'Tentative',
  mobHomeContact: '4162039804',
  connectedAttempted: true,
  billingAccountNameExt: { firstName: 'AASAM', lastName: 'AAHAM' },
  parentId: '70873913_mobility',
  billingTypeSubtype: { type: 'I', subtype: 'R' },
  contactNum: 'hidden',
  brand: 'telus',
  billingAcctType: 'TELUS Mobility - Consumer',
  billingAddressExt: {
    primaryLineTxt: '10150 JASPER AV NW',
    streetNum: '10150',
    streetName: 'JASPER AV NW',
    cityName: 'EDMONTON',
    provinceCode: 'AB',
    postalCode: 'T5J1W4',
    countryCode: 'CAN'
  },
  isErrorSummary: true,
  isProfileError: true,
  isSelectedBan: true,
  isErrorConnected: false,
  lineOfBusiness: 'mobility',
  authorizedUsers: [''],
  isFetchingIdentities: false,
  fetchIdentitiesErr: true,
  billingAddressSearchTxt: '10150 JASPER AV NW EDMONTON AB',
  fetchingSummaryEndAt: 1625494866649,
  customerPortalEmail: '',
  isFetchingSummary: false,
  isParent: true,
  pin: '1234',
  fetchingSummaryStartedAt: 1625494863604,
  isFetchingConnected: false,
  transBillingAcctStatus: 'Open',
  billingAcctNum: '70873913',
  contactPhoneNum: '4162039804',
  billingAddress: '10150 JASPER AV NW EDMONTON AB CAN T5J1W4',
  customerId: '70873913',
  preferredLanguage: 'en',
  fetchingLinkedAcctEndAt: 1625494865685,
  billingAccountName: 'AASAM AAHAM'
}

const banFns = {
  addDetail: () => {},
  createNewTask: () => {},
  fetchBillingAcctSummary: () => {}
}
export const genBanProps = ({
  billingAcctNum,
  billingAcctType,
  billingAddress
}) => ({
  ...banFns,
  isTaskOpen: false,
  taskState: {
    product: {
      [billingAcctNum]: {
        isFetching: false,
        isError: true,
        fetchingProductStartAt: 1627027025470,
        lineOfBusiness: 'mobility',
        products: {},
        addresses: [],
        fetchingProductEndAt: 1627027025942
      }
    },
    task: {
      taskUDTypeStatus: 'SUCCESS',
      udItemList: {
        request: {
          en: {
            koodoDOA: 'DOA',
            EscalationFollowUp: 'Escalation Follow Up',
            koodoRepairAndReturn: 'Repair & Return',
            FMSCourtesyCall: 'FMS Courtesy Call',
            Repair: 'Repair',
            telusMobilityMBG: 'Billing',
            Migration: 'Migrations',
            PREFollowUp: 'PRE Follow Up',
            AccountManagement: 'Account Management',
            Change: 'Change',
            Cease: 'Cease',
            Move: 'Move',
            PAC: 'PAC',
            telusMobilityDOA: 'DOA',
            Fieldlink: 'Fieldlink',
            Activation: 'Activation',
            CLSFollowUp: 'CLS Follow Up',
            telusMobilityRepairAndReturn: 'Repair & Return',
            SOS: 'SOS',
            PreBilling: 'PRE Follow Up',
            PreActivation: 'PRE Activation',
            CreditBureauAmendment: 'Credit Bureau Amendment',
            Renewals: 'Renewals',
            telusMobilityAppleOTCDelay: 'Apple OTC Delay',
            Install: 'Install',
            Billing: 'Billing',
            koodoMBG: 'Billing',
            Upgrade: 'Upgrade'
          },
          fr: {
            koodoDOA: 'DOA',
            EscalationFollowUp: 'Suivi - Recours',
            koodoRepairAndReturn: 'Réparation et retour',
            FMSCourtesyCall: 'Appel de courtoisie',
            Repair: 'Réparation',
            telusMobilityMBG: 'Facturation',
            Migration: 'Migrations',
            PREFollowUp: 'Prépayé – Suivi',
            AccountManagement: 'Gestion du compte',
            Change: 'Changement',
            Cease: 'Annulation',
            Move: 'Déplacement',
            PAC: 'PAC',
            telusMobilityDOA: 'DOA',
            Fieldlink: 'Fieldlink',
            Activation: 'Activation',
            CLSFollowUp: 'Suivi CLS',
            telusMobilityRepairAndReturn: 'Réparation et retour',
            SOS: 'S.O.S.',
            PreBilling: 'Prépayé – Suivi',
            PreActivation: 'Prépayé – Activation',
            CreditBureauAmendment: 'Modification Crédit',
            Renewals: 'Renouvellement',
            telusMobilityAppleOTCDelay: 'Retard Apple OTC',
            Install: 'Installation',
            Billing: 'Facturation',
            koodoMBG: 'Facturation',
            Upgrade: 'Renouvellement'
          }
        },
        subtype: {
          en: {
            AccountActionRequired: 'Account Action Required',
            TelusFollowUp: 'TELUS Follow Up',
            AppointmentUpdate: 'Appointment Update',
            SmartHomeSecurity: 'Smart Home Security',
            WarrantyFollowUp: 'Warranty Follow-Up',
            ReqfromNetworkSupport: 'Request from Copper Tier II',
            IncorrectCustomerInformation: 'Incorrect Customer Information',
            getMyProductServiceWorking: 'Fix My Service',
            AccountStatusCheck: 'Account Status Check',
            CustomerFollowUp: 'Customer Follow Up',
            FMSCourtesyCall: 'FMS Courtesy Call',
            PromiseToContact: 'Promise To Contact',
            CCTSFollowUp: 'CCTS/BBB Follow-up',
            CancelViaChat: 'Cancel Via Chat',
            agentFunctionReasonjM1Ts: 'agentEnglish6fgMN',
            FollowUp: 'Follow Up',
            NovaResponse: 'Nova Response',
            PostToPreMigrations: 'Post to Pre Migrations',
            CustomerNotReady: 'Customer Not Ready',
            TechnicianFollowUp: 'Technician Follow Up',
            getBetterDeal: 'Renewals',
            ManagerCallback: 'Manager Callback',
            PrivacyFollowUp: 'TLS Follow-Up',
            TOWNcheck: 'TOWN Check',
            signUpForProductService: 'Activations',
            CustomerCancel: 'Customer Cancel',
            ChannelEscalation: 'Channel Escalation',
            dfRefund: 'DF Refund',
            CreditBureauAmendment: 'Credit Bureau Amendment',
            subtaskUwObV: 'subtaskEnglishx1lMJ',
            ReplyFromORT: 'Reply from ORT'
          },
          fr: {
            AccountActionRequired: 'Action Requise',
            TelusFollowUp: 'Suivi interne',
            AppointmentUpdate: 'Modifier Rendez-vous',
            SmartHomeSecurity: 'Smart Home Security',
            WarrantyFollowUp: 'Suivi Garantie',
            ReqfromNetworkSupport: 'Requête 2ième niveau (Cuivre)',
            IncorrectCustomerInformation: 'Mauvaise info client',
            getMyProductServiceWorking: 'Rétablir mon service',
            AccountStatusCheck: 'Vérification du compte',
            CustomerFollowUp: 'Suivi - Client',
            FMSCourtesyCall: 'Appel de courtoisie',
            PromiseToContact: 'Rappel demandé',
            CCTSFollowUp: 'Suivi - CPRST/BEC',
            CancelViaChat: 'Annuler via chat',
            agentFunctionReasonjM1Ts: 'agentFrenchsEGtS',
            FollowUp: 'Suivi',
            NovaResponse: 'Réponse de Nova',
            PostToPreMigrations: 'Migrations Postpayé à Prépayé',
            CustomerNotReady: '',
            TechnicianFollowUp: 'Suivi du technicien',
            getBetterDeal: 'Renouvellement',
            ManagerCallback: 'Rappel superviseur',
            PrivacyFollowUp: 'Suivi TLS',
            TOWNcheck: 'Vérification Transfert de responsabilité',
            signUpForProductService: 'Activations',
            CustomerCancel: '',
            ChannelEscalation: 'Support - détaillants',
            dfRefund: 'Remboursement Traitement en direct',
            CreditBureauAmendment: 'Modifications crédit',
            subtaskUwObV: 'subtaskFrenchjw09q',
            ReplyFromORT: 'Réponse de RC'
          }
        },
        completeReason: {
          en: {
            IssueResolved: 'Issues Resolved',
            FollowUpCompleted: 'Follow-up Completed',
            SubstitutedByAnotherTask: 'Substituted by another Task'
          },
          fr: {
            IssueResolved: 'Problèmes résolus',
            FollowUpCompleted: 'Suivi effectué',
            SubstitutedByAnotherTask: 'Substitué par une autre tâche'
          }
        },
        cancelReason: {
          en: {
            RequiresEscalation: 'Requires Escalation',
            AlreadyCompleted: 'Already Completed',
            NoLongerRequired: 'No Longer Required'
          },
          fr: {
            RequiresEscalation: 'Requiert une escalation',
            AlreadyCompleted: 'Déjà effectué',
            NoLongerRequired: 'N’est plus nécessaire'
          }
        },
        transactionType: {
          en: {
            chargeAdjustment: 'Charge Adjustment',
            payment: 'Payment',
            transfer: 'Transfer',
            debit: 'Debit',
            usageAdjustment: 'Usage Adjustment',
            paymentTransfer: 'Payment Transfer',
            paymentReturn: 'Payment Return',
            refund: 'Refund',
            credit: 'Credit',
            debitReversal: 'Debit Reversal',
            adjustmentReversal: 'Adjustment Reversal',
            paymentRefund: 'Payment Refund'
          },
          fr: {
            chargeAdjustment: 'Rajustement de charge',
            payment: 'Paiement',
            transfer: 'Transfert',
            debit: 'Débit',
            usageAdjustment: 'Rajustement d’utilisation',
            paymentTransfer: 'Transfert de paiement',
            paymentReturn: 'Retour de paiement',
            refund: 'Remboursement',
            credit: 'Crébit',
            debitReversal: 'Annulation de débit',
            adjustmentReversal: 'Annulation d’ajustment',
            paymentRefund: 'Remboursement de paiement'
          }
        },
        transactionStatus: {
          en: {
            approved: 'Approved',
            completed: 'Completed',
            incomplete: 'Incomplete',
            pending: 'Pending',
            rejected: 'Rejected',
            reversed: 'Reversed'
          },
          fr: {
            approved: 'Approuvé',
            completed: 'Complété',
            incomplete: 'Incomplet',
            pending: 'En attente',
            rejected: 'Rejeté',
            reversed: 'Renversé'
          }
        }
      },
      updateTaskStatus: 'UNINIT',
      taskCascadeMenuItem: [
        {
          key: 'TELUS',
          value: 'TELUS',
          lob: [
            {
              key: 'HomeSolutions',
              value: 'HomeSolutions',
              requestType: [
                {
                  key: 'Install',
                  value: 'Install',
                  subType: [
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'ReplyFromORT',
                      value: 'ReplyFromORT',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'AppointmentUpdate',
                      value: 'AppointmentUpdate',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'activation',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                },
                {
                  key: 'Move',
                  value: 'Move',
                  subType: [
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120,
                        serviceGroup: 'TELUS_CE_WLN_MOVE'
                      }
                    },
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120,
                        serviceGroup: 'TELUS_CE_WLN_MOVE'
                      }
                    },
                    {
                      key: 'ReplyFromORT',
                      value: 'ReplyFromORT',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120,
                        serviceGroup: 'TELUS_CE_WLN_MOVE'
                      }
                    },
                    {
                      key: 'AppointmentUpdate',
                      value: 'AppointmentUpdate',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120,
                        serviceGroup: 'TELUS_CE_WLN_MOVE'
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'move',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                },
                {
                  key: 'Billing',
                  value: 'Billing',
                  subType: [
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'ReplyFromORT',
                      value: 'ReplyFromORT',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'collections',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                },
                {
                  key: 'Cease',
                  value: 'Cease',
                  subType: [
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'churnmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'ReplyFromORT',
                      value: 'ReplyFromORT',
                      resultSet: {
                        intent: 'churnmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'CancelViaChat',
                      value: 'CancelViaChat',
                      resultSet: {
                        intent: 'churnmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'churnmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'churnmgmt',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'AppointmentUpdate',
                      value: 'AppointmentUpdate',
                      resultSet: {
                        intent: 'churnmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                },
                {
                  key: 'Change',
                  value: 'Change',
                  subType: [
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'ReplyFromORT',
                      value: 'ReplyFromORT',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'AppointmentUpdate',
                      value: 'AppointmentUpdate',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'acctmgmt',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                },
                {
                  key: 'Repair',
                  value: 'Repair',
                  subType: [
                    {
                      key: 'CustomerFollowUp',
                      value: 'CustomerFollowUp',
                      resultSet: {
                        intent: 'fixhsia',
                        taskPriority: 'Urgent',
                        agentFunction: 'TS',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'AppointmentUpdate',
                      value: 'AppointmentUpdate',
                      resultSet: {
                        intent: 'fixhsia',
                        taskPriority: 'Urgent',
                        agentFunction: 'TS',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'ReqfromNetworkSupport',
                      value: 'ReqfromNetworkSupport',
                      resultSet: {
                        intent: 'fixhsia',
                        taskPriority: 'Urgent',
                        agentFunction: 'TS',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'TelusFollowUp',
                      value: 'TelusFollowUp',
                      resultSet: {
                        intent: 'fixhsia',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    },
                    {
                      key: 'SmartHomeSecurity',
                      value: 'SmartHomeSecurity',
                      resultSet: {
                        intent: 'fixhsia',
                        serviceGroup: 'TELUS_CE_WLN_SHS',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 5760,
                        automatedStandalone: false,
                        genesysReminderUnit: 120
                      }
                    }
                  ]
                }
              ]
            },
            {
              key: 'Mobility',
              value: 'Mobility',
              requestType: [
                {
                  key: 'CLSFollowUp',
                  value: 'CLSFollowUp',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CR2',
                        taskPriority: 'Urgent',
                        genesysReminderUnit: 720,
                        taskExpiryUnit: 10080,
                        automatedStandalone: false
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CR2',
                        taskPriority: 'Medium',
                        genesysReminderUnit: 240,
                        taskExpiryUnit: 30240,
                        automatedStandalone: false
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CR2',
                        taskPriority: 'High',
                        genesysReminderUnit: 480,
                        taskExpiryUnit: 20160,
                        automatedStandalone: false
                      }
                    }
                  ]
                },
                {
                  key: 'CreditBureauAmendment',
                  value: 'CreditBureauAmendment',
                  subType: [
                    {
                      key: 'FollowUp',
                      value: 'FollowUp',
                      resultSet: {
                        intent: 'collections',
                        billingType: 'postpaid',
                        taskPriority: 'Urgent',
                        agentFunction: 'CS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 240,
                        serviceGroup: 'TELUS_CE_WLN_OCD'
                      }
                    }
                  ]
                },
                {
                  key: 'EscalationFollowUp',
                  value: 'EscalationFollowUp',
                  subType: [
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'CRMT',
                        billingType: 'postpaid',
                        serviceGroup: 'TELUS_CE_WLS_CRMT_ESCALATIONS',
                        taskPriority: 'High',
                        agentFunction: 'CS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'CRMT',
                        billingType: 'postpaid',
                        serviceGroup: 'TELUS_CE_WLS_CRMT_ESCALATIONS',
                        taskPriority: 'Medium',
                        agentFunction: 'CS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'CRMT',
                        billingType: 'postpaid',
                        serviceGroup: 'TELUS_CE_WLS_CRMT_ESCALATIONS',
                        taskPriority: 'Urgent',
                        agentFunction: 'CS',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    }
                  ]
                },
                {
                  key: 'FMSCourtesyCall',
                  value: 'FMSCourtesyCall',
                  subType: [
                    {
                      key: 'FollowUp',
                      value: 'FollowUp',
                      resultSet: {
                        intent: 'fixdevice',
                        billingType: 'postpaid',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 60
                      }
                    }
                  ]
                },
                {
                  key: 'Migration',
                  value: 'Migration',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'move',
                        billingType: 'postpaid',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'move',
                        billingType: 'postpaid',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'move',
                        billingType: 'postpaid',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    }
                  ]
                },
                {
                  key: 'Billing',
                  value: 'Billing',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    }
                  ]
                },
                {
                  key: 'AccountManagement',
                  value: 'AccountManagement',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        billingType: 'postpaid',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'TOWNcheck',
                      value: 'TOWNcheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '12:00',
                        genesysReminderUnit: 720,
                        automatedStandalone: false
                      }
                    },
                    {
                      key: 'PostToPreMigrations',
                      value: 'PostToPreMigrations',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '12:00',
                        genesysReminderUnit: 480,
                        automatedStandalone: false
                      }
                    }
                  ]
                },
                {
                  key: 'Repair',
                  value: 'Repair',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'fixdevice',
                        billingType: 'postpaid',
                        taskPriority: 'Urgent',
                        agentFunction: 'TS',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'fixdevice',
                        billingType: 'postpaid',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'fixdevice',
                        billingType: 'postpaid',
                        taskPriority: 'Medium',
                        agentFunction: 'TS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    }
                  ]
                },
                {
                  key: 'PAC',
                  value: 'PAC',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CS',
                        taskPriority: 'Urgent',
                        genesysReminderUnit: 180,
                        taskExpiryUnit: 86400,
                        automatedStandalone: false,
                        serviceGroup: 'TELUS_CE_WLS_PAC'
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CS',
                        taskPriority: 'Medium',
                        genesysReminderUnit: 360,
                        taskExpiryUnit: 86400,
                        automatedStandalone: false,
                        serviceGroup: 'TELUS_CE_WLS_PAC'
                      }
                    }
                  ]
                },
                {
                  key: 'PreActivation',
                  value: 'PreActivation',
                  subType: [
                    {
                      key: 'IncorrectCustomerInformation',
                      value: 'IncorrectCustomerInformation',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '24:00',
                        genesysReminderUnit: 480,
                        automatedStandalone: false
                      }
                    }
                  ]
                },
                {
                  key: 'PREFollowUp',
                  value: 'PREFollowUp',
                  subType: [
                    {
                      key: 'IncorrectCustomerInformation',
                      value: 'IncorrectCustomerInformation',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '24:00',
                        genesysReminderUnit: 480,
                        automatedStandalone: false
                      }
                    }
                  ]
                },
                {
                  key: 'PreBilling',
                  value: 'PreBilling',
                  subType: [
                    {
                      key: 'IncorrectCustomerInformation',
                      value: 'IncorrectCustomerInformation',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '24:00',
                        genesysReminderUnit: 480,
                        automatedStandalone: false
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          key: 'KOODO',
          value: 'KOODO',
          lob: [
            {
              key: 'Mobility',
              value: 'Mobility',
              requestType: [
                {
                  key: 'SOS',
                  value: 'SOS',
                  subType: [
                    {
                      key: 'ChannelEscalation',
                      value: 'ChannelEscalation',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Medium',
                        agentFunction: 'CS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'PrivacyFollowUp',
                      value: 'PrivacyFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'CreditBureauAmendment',
                      value: 'CreditBureauAmendment',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Medium',
                        agentFunction: 'CS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 480,
                        serviceGroup: 'TELUS_CE_WLN_OCD'
                      }
                    },
                    {
                      key: 'WarrantyFollowUp',
                      value: 'WarrantyFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CS',
                        taskExpiryUnit: 86400,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'ManagerCallback',
                      value: 'ManagerCallback',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CS',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'CCTSFollowUp',
                      value: 'CCTSFollowUp',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    }
                  ]
                },
                {
                  key: 'Billing',
                  value: 'Billing',
                  subType: [
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Medium',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    }
                  ]
                },
                {
                  key: 'AccountManagement',
                  value: 'AccountManagement',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'Medium',
                        agentFunction: 'CR2',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    },
                    {
                      key: 'TOWNcheck',
                      value: 'TOWNcheck',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '12:00',
                        genesysReminderUnit: 720,
                        automatedStandalone: false
                      }
                    },
                    {
                      key: 'PostToPreMigrations',
                      value: 'PostToPreMigrations',
                      resultSet: {
                        intent: 'acctmgmt',
                        taskPriority: 'High',
                        agentFunction: 'CR2',
                        serviceGroup: '',
                        taskExpiryUnit: 43200,
                        defaultDueDate: 20160,
                        defaultTime: '12:00',
                        genesysReminderUnit: 480,
                        automatedStandalone: false
                      }
                    }
                  ]
                },
                {
                  key: 'FMSCourtesyCall',
                  value: 'FMSCourtesyCall',
                  subType: [
                    {
                      key: 'FollowUp',
                      value: 'FollowUp',
                      resultSet: {
                        intent: 'fixdevice',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 60
                      }
                    }
                  ]
                },
                {
                  key: 'Upgrade',
                  value: 'Upgrade',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'renew',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'renew',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'renew',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    }
                  ]
                },
                {
                  key: 'Repair',
                  value: 'Repair',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'fixdevice',
                        taskPriority: 'Urgent',
                        agentFunction: 'TS',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'fixdevice',
                        taskPriority: 'High',
                        agentFunction: 'TS',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'fixdevice',
                        taskPriority: 'Medium',
                        agentFunction: 'TS',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    }
                  ]
                },
                {
                  key: 'Activation',
                  value: 'Activation',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'activation',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    }
                  ]
                },
                {
                  key: 'Migration',
                  value: 'Migration',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'Urgent',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 20160,
                        automatedStandalone: false,
                        genesysReminderUnit: 720
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'High',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 43200,
                        automatedStandalone: false,
                        genesysReminderUnit: 480
                      }
                    },
                    {
                      key: 'AccountStatusCheck',
                      value: 'AccountStatusCheck',
                      resultSet: {
                        intent: 'move',
                        taskPriority: 'Medium',
                        agentFunction: 'CR1',
                        taskExpiryUnit: 64800,
                        automatedStandalone: false,
                        genesysReminderUnit: 240
                      }
                    }
                  ]
                },
                {
                  key: 'PAC',
                  value: 'PAC',
                  subType: [
                    {
                      key: 'PromiseToContact',
                      value: 'PromiseToContact',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CS',
                        taskPriority: 'Urgent',
                        genesysReminderUnit: 180,
                        taskExpiryUnit: 86400,
                        automatedStandalone: false,
                        serviceGroup: 'TELUS_CE_WLS_PAC'
                      }
                    },
                    {
                      key: 'AccountActionRequired',
                      value: 'AccountActionRequired',
                      resultSet: {
                        intent: 'acctmgmt',
                        agentFunction: 'CS',
                        taskPriority: 'Medium',
                        genesysReminderUnit: 360,
                        taskExpiryUnit: 86400,
                        automatedStandalone: false,
                        serviceGroup: 'TELUS_CE_WLS_PAC'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      dueDateDurationStatus: 'PENDING',
      addTaskCommentStatus: 'UNINIT',
      taskTab: {
        [`${billingAcctNum}_mobility`]: {
          list: {
            selectedTab: 'pending',
            fetchStatus: 'SUCCESS',
            isCaseFailed: false,
            isOrderFailed: false,
            isOtcodsCaseFailed: false,
            isOtcodsTaskFailed: false,
            data: {
              itemList: [],
              noOfOtcodsCases: 0,
              noOfOtcodsTasks: 0,
              noOfOpenTasks: 0,
              noOfClosedTasks: 0,
              noOfOpenCases: 0,
              noOfClosedCases: 0,
              overDueIndicator: false
            },
            fetchingCustStoriesStartedAt: 1627027028090,
            fetchingCustStoriesEnddAt: 1627027030722
          },
          caseList: {},
          taskForm: { taskFormOpen: false },
          taskHistory: { fetchStatus: 'UNINIT', data: [] },
          taskDetailModal: {
            taskDetailOpen: false,
            taskMasterData: {},
            useCalendarDate: false,
            calendarIsBusinessHours: false,
            calendarDate: '',
            updateTaskStatus: 'UNINIT'
          },
          filter: ''
        }
      },
      index: { create: 900, detail: 200 },
      udItemListStatus: 'SUCCESS',
      taskCascadeMenuItemStatus: 'SUCCESS',
      dueDateDuration: { name: 'REMINDER_UNIT_DUE_DATE_RESTRICT', value: 24 },
      taskUDTypeData: {
        CancelReasonCase: [
          { id: 1, value: 'NoLongerRequired' },
          { id: 2, value: 'AlreadyCompleted' },
          { id: 3, value: 'RequiresEscalation' }
        ],
        CancelReason: [
          { id: 1, value: 'NoLongerRequired' },
          { id: 2, value: 'RequiresEscalation' },
          { id: 3, value: 'AlreadyCompleted' }
        ],
        ResultingOutcomeCase: [
          { id: 1, value: 'FollowUpCompleted' },
          { id: 2, value: 'IssueResolved' }
        ],
        ResultingOutcome: [
          { id: 1, value: 'SubstitutedByAnotherTask' },
          { id: 2, value: 'IssueResolved' },
          { id: 3, value: 'FollowUpCompleted' }
        ],
        Language: [
          { id: 1, value: 'English' },
          { id: 2, value: 'French' },
          { id: 3, value: 'Mandarin' },
          { id: 4, value: 'Cantonese' }
        ],
        System: [
          { id: 1, value: 'OTS' },
          { id: 2, value: 'OMS' },
          { id: 3, value: 'RTS' },
          { id: 4, value: 'LYNX' },
          { id: 5, value: 'FIFA' },
          { id: 6, value: 'ARS' }
        ]
      }
    }
  },
  openBansSummary: {
    mobility: [
      {
        fetchingLinkedAcctStartedAt: 1627027025488,
        mobBusinessContact: '',
        customerPrimaryContactEmail: '',
        billingAccountDate: '2019-05-22',
        billingAcctStatus: 'Tentative',
        mobHomeContact: '4162039804',
        dueDate: '',
        currentBalance: '0.00',
        connectedAttempted: true,
        billingAccountNameExt: { firstName: 'AASAM', lastName: 'AAHAM' },
        currentCycleStartDt: '',
        parentId: `${billingAcctNum}_mobility`,
        billingTypeSubtype: { type: 'I', subtype: 'R' },
        driversLicence: '*******9808',
        contactNum: 'hidden',
        creditInfo: { creditClassCd: 'D' },
        brand: 'telus',
        billingAcctType: billingAcctType,
        billingAddressExt: {
          primaryLineTxt: '10150 JASPER AV NW',
          streetNum: '10150',
          streetName: 'JASPER AV NW',
          cityName: 'EDMONTON',
          provinceCode: 'AB',
          postalCode: 'T5J1W4',
          countryCode: 'CAN'
        },
        isErrorSummary: false,
        isProfileError: false,
        contactNumber: '',
        isSelectedBan: true,
        lastBillAmt: 0,
        isErrorConnected: false,
        lineOfBusiness: 'mobility',
        hearingAssistance: '',
        birthDate: '*** *** 2000',
        authorizedUsers: [''],
        isFetchingIdentities: false,
        billingAcctStatusDate: '2019-05-22',
        fetchIdentitiesErr: false,
        billingAddressSearchTxt: '10150 JASPER AV NW EDMONTON AB',
        fetchingSummaryEndAt: 1627027030977,
        suffix: '',
        TSDCode: '',
        teamMemberID: '',
        customerPortalEmail: '',
        isFetchingSummary: false,
        isParent: true,
        pin: '1234',
        fetchingSummaryStartedAt: 1627027025521,
        treatmentIndicator: false,
        isFetchingConnected: false,
        sin: '*** *** 982',
        transBillingAcctStatus: 'Open',
        salutation: '',
        visualAssistance: '',
        billingAcctNum: billingAcctNum,
        contactPhoneNum: '4162039804',
        billingAddress: billingAddress,
        customerId: billingAcctNum,
        preferredLanguage: 'en',
        timezone: 'MT',
        fetchingLinkedAcctEndAt: 1627027028017,
        billingAcctCreationDate: '2019-05-22',
        billMedium: 'eBill',
        billingAccountName: 'AASAM AAHAM',
        lastVerified: '',
        currentCycleEndDt: '',
        pap: 'No',
        billCycle: '31',
        ianaTimeZoneId: 'America/Edmonton'
      }
    ],
    ffh: []
  },
  closedBansSummary: { mobility: [], ffh: [] },
  currentCustomer: {
    firstLevelTab: 'Overview',
    secondLevelTab: {
      Overview: '',
      Billing: 'transactions',
      Profile: 'personal'
    },
    isTabCreate: false,
    lineOfBusiness: 'mobility',
    name: 'AASAM AAHAM',
    triggerAnimation: false,
    adobe: {
      pushedProductSummaryBanList: [billingAcctNum],
      pushedProductDetailsIdList: []
    },
    tabUniqId: `${billingAcctNum}_mobility`,
    billingAcctNum: billingAcctNum,
    customerId: billingAcctNum,
    template: 'profile',
    id: 2,
    currentView: 'profile'
  },
  mobSharedDataUsage: {},
  parentBanDetail: {
    fetchingLinkedAcctStartedAt: 1627027025488,
    mobBusinessContact: '',
    customerPrimaryContactEmail: '',
    billingAccountDate: '2019-05-22',
    billingAcctStatus: 'Tentative',
    mobHomeContact: '4162039804',
    dueDate: '',
    currentBalance: '0.00',
    connectedAttempted: true,
    billingAccountNameExt: { firstName: 'AASAM', lastName: 'AAHAM' },
    currentCycleStartDt: '',
    parentId: `${billingAcctNum}_mobility`,
    billingTypeSubtype: { type: 'I', subtype: 'R' },
    driversLicence: '*******9808',
    contactNum: 'hidden',
    creditInfo: { creditClassCd: 'D' },
    brand: 'telus',
    billingAcctType: billingAcctType,
    billingAddressExt: {
      primaryLineTxt: '10150 JASPER AV NW',
      streetNum: '10150',
      streetName: 'JASPER AV NW',
      cityName: 'EDMONTON',
      provinceCode: 'AB',
      postalCode: 'T5J1W4',
      countryCode: 'CAN'
    },
    isErrorSummary: false,
    isProfileError: false,
    contactNumber: '',
    isSelectedBan: true,
    lastBillAmt: 0,
    isErrorConnected: false,
    lineOfBusiness: 'mobility',
    hearingAssistance: '',
    birthDate: '*** *** 2000',
    authorizedUsers: [''],
    isFetchingIdentities: false,
    billingAcctStatusDate: '2019-05-22',
    fetchIdentitiesErr: false,
    billingAddressSearchTxt: '10150 JASPER AV NW EDMONTON AB',
    fetchingSummaryEndAt: 1627027030977,
    suffix: '',
    TSDCode: '',
    teamMemberID: '',
    customerPortalEmail: '',
    isFetchingSummary: false,
    isParent: true,
    pin: '1234',
    fetchingSummaryStartedAt: 1627027025521,
    treatmentIndicator: false,
    isFetchingConnected: false,
    sin: '*** *** 982',
    transBillingAcctStatus: 'Open',
    salutation: '',
    visualAssistance: '',
    billingAcctNum: billingAcctNum,
    contactPhoneNum: '4162039804',
    billingAddress: billingAddress,
    customerId: billingAcctNum,
    preferredLanguage: 'en',
    timezone: 'MT',
    fetchingLinkedAcctEndAt: 1627027028017,
    billingAcctCreationDate: '2019-05-22',
    billMedium: 'eBill',
    billingAccountName: 'AASAM AAHAM',
    lastVerified: '',
    currentCycleEndDt: '',
    pap: 'No',
    billCycle: '31',
    ianaTimeZoneId: 'America/Edmonton'
  },
  displayNoteForm: {},
  isBanSummarDetaillsNotExists: false
})
