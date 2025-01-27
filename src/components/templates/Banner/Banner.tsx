import React, { useState } from 'react';
import './Banner.css';

import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import logo from "../../../assets/icons/sidebar/logo.png";

export default function Banner() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="header">
        <button className="btn-pro" onClick={handleOpen}>
          О нас
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="banner-modal-title"
        aria-describedby="banner-modal-description"
      >
        <Box className="modal-box">
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <div className="logo-container">
            <img src={logo} alt="Логотип" className="banner-logo" />
          </div>

          <Typography id="banner-modal-title" variant="h6" component="h2">
            Команда сервиса «LawGPT» приветствует вас!
          </Typography>
          <Typography id="banner-modal-description" sx={{ mt: 2 }}>
            «LawGPT» — это юридический помощник на базе LLM-модели, который помогает находить ответы на юридические вопросы, анализировать документы и создавать краткие и информативные summary.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Помимо использования встроенных знаний, сервис взаимодействует с системой «ГАРАНТ» и выполняет узкопрофильный веб-поиск, чтобы предоставлять максимально точные и актуальные результаты.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            До конца мая 2025 года сервис доступен бесплатно, затем планируется внедрение подписки.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Подписывайтесь на Telegram-канал сервиса:{' '}
            <a href="https://t.me/Law_GPT" className='link-banner-tg' target="_blank" rel="noopener noreferrer">
              https://t.me/Law_GPT
            </a>
          </Typography>
          <Typography id='banner-modal-end' sx={{ mt: 2 }}>
            Желаем эффективной работы с «LawGPT»!
          </Typography>

          <div className="header">
            {/* Ссылка на Telegram вместо кнопки */}
            <a
              href="https://t.me/Law_GPT"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pro-link"
            >
              Продолжить
            </a>
          </div>
        </Box>
      </Modal>
    </div>
  );
}