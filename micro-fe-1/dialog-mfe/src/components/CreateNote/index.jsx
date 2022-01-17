import { useBolster } from '@mobilelive-inc/bolsterjs';
import React, { useState } from 'react';
import Dialog from './dialog';
import { SaveButton } from '../Task/styles'
import CreateNoteForm from './Form';
import TaskForm from './TaskForm';
import { getCasaAppLocale } from '../../utils/locale';
import { useEffect } from 'react';

export default () => {
  const { dialogEvent, isEnvExperience, lang } = useBolster();
  const locale = getCasaAppLocale(lang);
  const [dialogs, setDialogs] = useState([]);
  let [tabId, setTabId] = useState(1);

  const openNewDialog = (type, subTabId) => {
    dialogs.push({
      id: tabId,
      tabUniqId: tabId,
      parentId: subTabId,
      position: tabId, 
      minimized: false, 
      type: 'Create',
      dialogTitle: type === 'note' ? locale.app.createNote : locale.app.newTask,
      bodyContent: createBodyContent(type, tabId, subTabId)
    });
    setDialogs(dialogs);
    tabId += 1;
    setTabId(tabId);
  }
  const createBodyContent = (type, tabId, subTabId) => {
    if (type === 'note') 
      return <CreateNoteForm subTabId={subTabId} dialogEvent={dialogEvent} tabId={tabId} openNewDialog={() => openNewDialog('note', tabId)}/>;
    else 
      return <TaskForm />
  }

  const updateTabDetails = (tabUniqId, values) => {
    const tab = dialogs.find(d => d.tabUniqId === tabUniqId);
    tab.minimized = values.minimized;
    setDialogs(dialogs);
  }

  const closeDialog = (tabUniqId) => {
    const current = dialogs.find(d => d.tabUniqId === tabUniqId);
    dialogs.splice(dialogs.indexOf(current), 1);
    dialogs.forEach(d => {
      if (d.position > current.position) {
        d.position -= 1;
      }
    });
    setDialogs(dialogs)
    tabId = dialogs.length + 1
    setTabId(tabId)
  }

  const onSubmit = (subTabId, tabId) => {
    const key = `sub_note_${subTabId}`;
    const value = localStorage.getItem(key);
    dialogEvent.emit(key, value);
    dialogEvent.emit('onNoteSubmit', value);
    closeDialog(tabId);
  }

  useEffect(() => {
    if (dialogEvent) {
      dialogEvent.on('note', () => {
        openNewDialog('note');
      })
      dialogEvent.on('task', () => {
        openNewDialog('task');
      })
    }
  }, [])

  return (
    <>
      {isEnvExperience && <SaveButton type="button" onClick={() => openNewDialog('note')}>{locale.app.openNoteDialog}</SaveButton>}
      {isEnvExperience && <SaveButton type="button" onClick={() => openNewDialog('task')}>{locale.app.openTaskDialog}</SaveButton>}
      {dialogs.map(d => 
        <Dialog 
          bodyContent={d.bodyContent} 
          dialogTitle={d.dialogTitle} 
          key={d.tabUniqId} 
          tabUniqId={d.tabUniqId} 
          parentId={d.parentId}
          tabIdDetail={dialogs} 
          onSubmit={onSubmit}
          closeDialog={closeDialog} 
          updateTabDetails={updateTabDetails}
        /> 
      )}
    </>
  )
};