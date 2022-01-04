import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper";
import { useEffect, useRef, useState } from "react";
import { getCharacters } from "./RickAndMortyApi";
import CharacterCard from "../../components/CharcterCard/CharacterCard";
import { throttle } from "../../helpers/decorators";
import HeadLine from "../../basics/HeadLine/HeadLine";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./RickAndMortyCharacters.css";
import Loading from "../../basics/Loading/Loading";

const MIN_SLIDE_SIZE = 250;
const SPACE_BETWEEN = 15;

const RickAndMortyCharacters = () => {
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const sliderRef = useRef();

  const incrementPage = () => {
    const newPage = page + 1;
    if (newPage > totalPages) return;
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();
    const request = getCharacters(page, controller);

    (async () => {
      const response = await request;
      if (response.error) return;
      const { info, results } = response;
      setTotalPages(info.pages);
      setCharacters((current) => [...current, ...results]);
      setLoading(false);
    })();

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    const handleResize = throttle(() => {
      const el = sliderRef?.current;
      if (!el) return;
      const currentStyles = getComputedStyle(el);
      const paddingX =
        parseFloat(currentStyles.getPropertyValue("padding-left")) +
        parseFloat(currentStyles.getPropertyValue("padding-right"));
      const items = Math.round(
        (el.clientWidth - paddingX) / (MIN_SLIDE_SIZE + SPACE_BETWEEN)
      );
      setSlidesPerView(items);
    });
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="rick-and-morty-characters">
      <HeadLine className="rick-and-morty-characters__heading">
        Rick and Morty characters
      </HeadLine>
      <Swiper
        ref={sliderRef}
        modules={[Navigation, Scrollbar, A11y]}
        navigation
        scrollbar={{ draggable: true }}
        slidesPerView={slidesPerView}
        spaceBetween={SPACE_BETWEEN}
        watchSlidesProgress={true}
        onReachEnd={incrementPage}
        enabled={!loading}
      >
        {characters.map((character) => (
          <SwiperSlide key={character.id}>
            {({ isActive }) => (
              <CharacterCard
                style={{ pointerEvents: !isActive ? "none" : "" }}
                {...character}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="rick-and-morty-characters__page">Page: {page}</div>
      {loading && <Loading />}
    </div>
  );
};

export default RickAndMortyCharacters;
