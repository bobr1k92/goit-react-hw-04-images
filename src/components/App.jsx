import { useEffect, useState } from 'react';
import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

import { fetchImg } from '../api/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [imgList, setImgList] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    if (name === '') {
      return;
    }
    async function fetchData() {
      try {
        setLoader(true);
        const list = await fetchImg(name, page);
        setImgList(prevState => [...prevState, ...list.hits]);
        setShowBtn(page < Math.ceil(list.totalHits / 12));
      } catch (error) {
        return error;
      } finally {
        setLoader(false);
      }
    }
    fetchData();
  }, [name, page]);

  const searchQuery = name => {
    setName(name);
    setPage(1);
    setImgList([]);
  };

  const onLoad = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onClickImg = (link, tag) => {
    setLargeImg(link);
    setTag(tag);

    toggleModal();
  };

  return (
    <Container>
      <GlobalStyle />
      <Searchbar onSubmit={searchQuery} />
      <ImageGallery list={imgList} onClick={onClickImg} />
      {loader && <Loader />}

      {showBtn && <Button onClick={onLoad} />}

      {showModal && (
        <Modal onShow={toggleModal}>
          <img src={largeImg} alt={tag} />
        </Modal>
      )}
    </Container>
  );
};
