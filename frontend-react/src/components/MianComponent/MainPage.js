import React, { useState } from 'react';
import axios from 'axios';
import './MainPage.scss';
import DefaultImg from '../../images/default-image.jpg';

const MainPage = () => {
  const [uploadedImage, setUploadedImage] = useState({
    src: DefaultImg,
    file: ''
  });
  const [serverResponse, setServerResponse] = useState('');

  const disabledButtonSave = !(uploadedImage.file);

  const previewImg = (e) => {
    setServerResponse('');

    if (e.target.files[0]) {
      setUploadedImage({
        src: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      });
    }
  }

  const onClickSave = () => {
    const fd = new FormData();
    fd.append('img', uploadedImage.file);

    axios.post('http://localhost:9000/addImage', fd)
      .then((res) => {
        setUploadedImage({
          src: DefaultImg,
          file: ''
        });
        setServerResponse(res.data);
      });
  }

  return (
    <div className='container'>
      <h1>Сохранение картинок</h1>

      <img src={uploadedImage.src} alt='your img' />

      <div className='btn-block'>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => onClickSave()}
          disabled={disabledButtonSave}
        >
          Сохранить
        </button>

        <input
          accept="image/*"
          className="d-none"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => previewImg(e)}
        />
        <label htmlFor="contained-button-file">
          <span
            className="btn btn-outline-primary"
          >
            Загрузить картинку
          </span>
        </label>
      </div>

      <p>{serverResponse}</p>
    </div>
  );
}

export default MainPage;