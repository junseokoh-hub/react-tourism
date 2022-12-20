import React, { useEffect } from "react";
import { DetailCommonType } from "../types/DetailType";

type ShareButtonsProps = {
  text: string | undefined;
  closeShare: () => void;
  data: DetailCommonType | undefined;
};

const ShareButtons = ({ text, closeShare, data }: ShareButtonsProps) => {
  // const currentUrl = `https://travelisty.web.app/${contentType}/${data?.contentid}/${data?.contenttypeid}`;
  const currentUrl = window.location.href;

  function shareTwitter() {
    let sendText = text;
    let sendUrl = currentUrl;
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl,
    );
  }

  function shareFacebook() {
    let sendUrl = currentUrl;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }

  return (
    <div className=" flex items-center fixed top-1/2 left-1/2 -translate-x-[130px] -translate-y-[80px] sm:-translate-x-[150px] rounded-md bg-white shadow-lg z-50 md:-translate-x-[100px]">
      <div className="py-3 px-2 space-x-4 flex items-center sm:space-x-8 sm:px-4 md:px-8 md:space-x-14">
        <svg
          className="w-12 h-12"
          fill="#3b5998"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={shareFacebook}
        >
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
        <svg
          className="w-12 h-12"
          fill="#00acee"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={shareTwitter}
        >
          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        </svg>
        <KakaoTalkShareBtn data={data} />
        <KakaoStoryShareBtn data={data} />
      </div>
      <svg
        className="py-1 w-8 h-8 place-self-start"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        onClick={closeShare}
      >
        <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
      </svg>
    </div>
  );
};

export default React.memo(ShareButtons);

const KakaoTalkShareBtn = ({
  data,
}: {
  data: DetailCommonType | undefined;
}) => {
  useEffect(() => {
    // const url = `https://travelisty.web.app/${contentType}/${data?.contentid}/${data?.contenttypeid}`;
    const url = window.location.href;

    const text = data && data.overview.replace(/<[^>]*>?/g, "");
    const createKakaoButton = () => {
      if (window.Kakao) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init(import.meta.env.VITE_KAKAO_KEY);
        }
        kakao.Link.createDefaultButton({
          container: "#kakao-link-btn",
          objectType: "feed",
          content: {
            title: data?.title,
            description: text,
            imageUrl:
              data?.firstimage ||
              data?.firstimage2 ||
              "../../images/noImage.jpg",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: url,
                webUrl: url,
              },
            },
          ],
        });
      }
    };
    createKakaoButton();
  }, []);

  return (
    <div>
      <img
        className="w-12 h-12 cursor-pointer"
        id="kakao-link-btn"
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오로 공유하기"
      />
    </div>
  );
};

const KakaoStoryShareBtn = ({
  data,
}: {
  data: DetailCommonType | undefined;
}) => {
  // const url = `https://travelisty.web.app/${contentType}/${data?.contentid}/${data?.contenttypeid}`;
  const url = window.location.href;
  const text = data && data.overview.replace(/<[^>]*>?/g, "");
  const shareStoryWeb = () => {
    window.Kakao.Story.share({
      url,
      text,
    });
  };

  return (
    <div id="share-kakaostory-button">
      <img
        onClick={shareStoryWeb}
        src="https://developers.kakao.com/sdk/js/resources/story/icon_small.png"
        alt="카카오스토리 공유하기 버튼"
        className="w-12 h-12 rounded-md"
      />
    </div>
  );
};
