import React from 'react'
import './Message.css'

import { Tooltip } from '@mui/material';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import loadingIcon from '@/assets/icons/loading.svg'

interface Props {
  text: string,
  role: "user" | "assistant",
  waiting?: boolean,
  url?: "string",
}

export default function Message({ text, role, waiting = false, url }: Props) {

  const urlName = url && url.split("/").at(-1)

  return (
    <div className={`message ${!waiting ? role : "loading"}-message`}>
      {!waiting ? text : <img width="40px" className='loading-icon-message' src={loadingIcon} alt='loading' />}
      {url && <a href={url}>
        <div className='download-file-icon'>
          <Tooltip title={`Установить файл - ${urlName}`}>
            <span>
              <InsertDriveFileIcon />
              {urlName}
            </span>
          </Tooltip>
        </div>
      </a>
      }
    </div>
  )
}
