//refrences
const PageOverlay = document.querySelector(".PageOverlay");
const aTags = document.querySelectorAll("a");
//functions
// This function gets an element and replace new class with old class
const ReplaceClasses = (element, oldClass, newClass) => {
    element.classList.remove(oldClass);
    element.classList.add(newClass);
};
// FixedNavbar
const Navbar = document.querySelector(".Navbar");

window.addEventListener("scroll", () => {
    if (scrollY > 300) {
        Navbar.classList.add("FixedNavbar");
        document.body.style.marginTop = Navbar.style.height;
    } else {
        document.body.style.marginTop = null;
        Navbar.classList.remove("FixedNavbar");

    }
});

// display and hide menubar search form
// refrence to menubar search btn
const NavSearchBtn = document.querySelector(".MenuSearchBtn");
// refrence to searchform in menubar
const SearchForm = document.querySelector(".SearchForm");
// show search inputs
NavSearchBtn.addEventListener("click", () => {
    if (!SearchForm.classList.contains("PopSearchForm"))
        SearchForm.classList.add("PopSearchForm");
    else
        SearchForm.classList.remove("PopSearchForm");
});

//User Login/Signup form
const UserBtn = document.querySelector(".UserBtn");
const LoginContainer = document.querySelector(".UserAccountActionContainer");
const CloseLoginForm = document.querySelector(".CloseUserActionContainer");
const SwitchAccountFormAction = document.querySelector(".SwitchAccountActionContainer");
const AccountPseudo = document.querySelector(".AccountPseudo"); //background overlay for active form button
const SignUpForm = document.querySelector(".SignUpForm");
const SignInForm = document.querySelector(".SignInForm");
if (SignUpForm != null && CloseLoginForm != null && SwitchAccountFormAction != null) {
    SignUpForm.classList.add("HiddenForm");
    //Show login form
    UserBtn.addEventListener("click", (e) => {
        e.preventDefault();
        LoginContainer.style.animation = "ShowLoginForm .2s forwards";
        LoginContainer.style.display = "flex";
    });
    //Close login form
    CloseLoginForm.addEventListener("click", () => {
        LoginContainer.style.animation = "HideLoginForm .2s forwards";
        setTimeout(() => {
            LoginContainer.style.display = "none";
        }, 200);
    });
    //Switch forms
    SwitchAccountFormAction.addEventListener("click", (e) => {
        if (e.target === SwitchAccountFormAction.children[0]) {
            //switch form button animation 
            setTimeout(() => {
                AccountPseudo.style.borderRadius = "0 5px 5px 0";
            }, 400);
            AccountPseudo.style.transform = "translateX(100%)";
            SignInForm.classList.remove("HiddenForm");
            SignUpForm.classList.add("HiddenForm");

        } else if (e.target === SwitchAccountFormAction.children[1]) {
            //switch form button animation 
            setTimeout(() => {
                AccountPseudo.style.borderRadius = " 5px 0 0 5px ";
            }, 400);
            AccountPseudo.style.transform = "translateX(0%)";
            SignUpForm.classList.remove("HiddenForm");
            SignInForm.classList.add("HiddenForm");
        }

    });

}

// Index news slider
// Get refrences#
const NewsSlider = document.querySelector(".NewsSlider");
const NewsSliderItem = Array.from(document.querySelectorAll(".NewsSliderItem"));
const SliderButton = Array.from(document.querySelectorAll(".SliderSquare"));
// NewsSlider Functions

//This function will control News Slider
const NewsSldierFunc = (dir) => {
    // dir 0 = right arrow, dir 1 = left arrow
    // adding transform to all slider elements
    NewsSliderItem.forEach(item => {
        item.style.transition = "transform .4s";
    });
    // this condition specifies center element
    let centerElement = [0, 1, 2];
    centerElement.forEach(item => {
        if (NewsSliderItem[item].classList.contains("NewsActiveSlider")) {
            centerElement = item;
        }
    });

    // this to variables specifces other two slider items  
    let NextItem, PrevItem;
    // 0 means that user clicked on right arrow and 1 means vice versa
    if (centerElement == 0) {
        if (dir == 0) {
            NextItem = 2;
            PrevItem = 1;
            NewsSliderItem[centerElement].style.transform = "translateX(251%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(-100%)";
            NewsSliderItem[NextItem].style.transform = "translateX(-66%)";
        } else {
            NextItem = 1;
            PrevItem = 2;
            NewsSliderItem[centerElement].style.transform = "translateX(0%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(0%)";
            NewsSliderItem[NextItem].style.transform = "translateX(0%)";
        }
    } else if (centerElement == 1) {
        if (dir == 0) {
            NextItem = 0;
            PrevItem = 2;
            NewsSliderItem[centerElement].style.transform = "translateX(101%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(-252%)";
            NewsSliderItem[NextItem].style.transform = "translateX(66%)";
        } else {
            NextItem = 2;
            PrevItem = 0;
            NewsSliderItem[centerElement].style.transform = "translateX(-101%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(252%)";
            NewsSliderItem[NextItem].style.transform = "translateX(-66%)";
        }
    } else {
        if (dir == 0) {
            NextItem = 1;
            PrevItem = 0;
            NewsSliderItem[centerElement].style.transform = "translateX(0%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(0%)";
            NewsSliderItem[NextItem].style.transform = "translateX(0%)";
        } else {
            NextItem = 0;
            PrevItem = 1;
            NewsSliderItem[centerElement].style.transform = "translateX(-252%)";
            NewsSliderItem[PrevItem].style.transform = "translateX(101%)";
            NewsSliderItem[NextItem].style.transform = "translateX(66%)";
        }
    }
    // change Active slider item to inactive item and vice versa
    ReplaceClasses(NewsSliderItem[centerElement], "NewsActiveSlider", "NewsInactiveSlider");
    ReplaceClasses(NewsSliderItem[NextItem], "NewsInactiveSlider", "NewsActiveSlider");
    // changing position of slider items

    // Hide previous active slider content and show new ones content
    NewsSliderItem[NextItem].childNodes.forEach(item => {
        if (item.classList != undefined) {
            if (item.classList.contains("hide")) {
                item.classList.remove("hide");
            }
        }
        NewsSliderItem[centerElement].childNodes.forEach(item => {
            if (item.classList != undefined) {
                if (item.classList.contains("NewsSliderContent")) {
                    item.classList.add("hide");
                }
            }
        });
    });
};
// News Slider Arrow button event listener
if (NewsSlider != null) {
    NewsSlider.addEventListener("click", (e) => {
        // slider Arrows
        if (e.target.nodeName === "I") {
            if (e.target.id === "RightArrow") {
                // 0 represents right arrow
                NewsSldierFunc(0);
            } else if (e.target.id === "LeftArrow") {
                // 0 represents left arrow
                NewsSldierFunc(1);
            }
        }
        // Slider button
        if (e.target.classList.contains("SliderSquare")) {
            //TODO
        }
    });
}



// Movies Slider Sections
// get refrences
const SliderArrow = document.querySelectorAll(".MoviesSliderArrows"); //Get movies list slider arrows
const LikeButton = document.querySelectorAll(".LikeButton");
const MoviesBox = document.querySelectorAll(".MoviesBox");
// Functions
// SliderControlFunction
const MoviesSliderFunc = (dir, items) => { //Dir represents for: 0 = Right 1 = Left
    let ActiveSLlide, RightSlide, LeftSlide;
    // this foreach specifies 3 diffrent parts of slider
    items.forEach(item => {

        if (!item.classList.contains("MoviesPageSliderItemsLeft") && !item.classList.contains("MoviesPageSliderItemsRight")) {
            // This is the slider that user currently see
            ActiveSLlide = item;
            ActiveSLlide.classList.remove("MovieSliderLeft");
            ActiveSLlide.classList.remove("MovieSliderRight");
        } else if (item.classList.contains("MoviesPageSliderItemsLeft")) {
            // This is the slider with translateX of -120%
            LeftSlide = item;
        } else if (item.classList.contains("MoviesPageSliderItemsRight")) {
            // This is the slider with translateX of 120%
            RightSlide = item;
        }
    });

    if (dir === 0) {
        ActiveSLlide.classList.add("MoviesPageSliderItemsRight");
        ReplaceClasses(LeftSlide, "MoviesPageSliderItemsLeft", "MovieSliderLeft");
        ReplaceClasses(RightSlide, "MoviesPageSliderItemsRight", "MoviesPageSliderItemsLeft");
    }
    if (dir === 1) {
        ActiveSLlide.classList.add("MoviesPageSliderItemsLeft");
        ReplaceClasses(RightSlide, "MoviesPageSliderItemsRight", "MovieSliderRight");
        ReplaceClasses(LeftSlide, "MoviesPageSliderItemsLeft", "MoviesPageSliderItemsRight");
    }
};

// Create Slider arrows functionalties
SliderArrow.forEach(item => {
    item.addEventListener("click", e => {
        //Gets current slider that user wants to use
        let ParentElement = e.target.parentNode.parentNode;
        // Gets sliders slides
        let MoviesSlides = Array.from(ParentElement.children).filter(item => {
            if (item.classList.contains("MoviesPageSliderItems")) {
                return item;
            }
        });

        if (e.target.id === "LeftArrow") {
            MoviesSliderFunc(1, MoviesSlides);

        } else if (e.target.id === "RightArrow") {
            MoviesSliderFunc(0, MoviesSlides);
        }
    });
});
//Show Story
MoviesBox.forEach(item => {
    item.addEventListener("mouseover", e => {
        item.childNodes.forEach(child => {
            if (child.classList != undefined) {
                if (child.classList.contains("MovieShortStoryContainer")) {
                    child.style.transform = "translateY(0%)";
                }
            }
        });
    });
    item.addEventListener("mouseleave", e => {
        item.childNodes.forEach(child => {
            if (child.classList != undefined) {
                if (child.classList.contains("MovieShortStoryContainer")) {
                    child.style.transform = "translateY(105%)";
                }
            }
        });
    });
});
//Like button
LikeButton.forEach(item => {
    item.addEventListener("click", () => {
        if (item.classList.contains("fa-heart-o")) {
            ReplaceClasses(item, "fa-heart-o", "fa-heart");
        } else {
            ReplaceClasses(item, "fa-heart", "fa-heart-o");
        }
    });
});
// Trailer Section
// refrences
const LatestTrailersSection = document.querySelector(".LatestTrailers");
const TrailerBox = document.querySelectorAll(".TrailerBox"); //Trailer Boxes
const PlayBtn = document.querySelectorAll(".PlayTrailerVideoBtn"); //Btn for showing trailer video
const TrailerVideosContainer = document.querySelector(".TrailersVideos"); //Trailer Videos Container
const CloseTrailer = document.querySelector(".CloseTrailerButton"); //Btn for closing trailer video
const TrailerVideo = document.querySelector(".TrailerVideo"); // Trailer Video
const Trailers = document.querySelectorAll(".Trailers"); //Get trailer slides
const TrailerSliderArrow = document.querySelector(".TrailersSliderArrow"); //Get Trailers Contaianer list slider arrows
// Functions
const TrailersSlider = (dir, slides) => {
    // dir specifes direction of clicked arrow: 0 stands for  right arrow and 1 stands for left arrow
    let FirstSlide, SecondSlide, ThirdSlide;
    for (let i = 0; i < slides.length; i++) {
        if (!Trailers[i].classList.contains("TrailerSliderLeft") && !Trailers[i].classList.contains("TrailerSliderRight")) {
            SecondSlide = Trailers[i];
            SecondSlide.classList.remove("MovieSliderLeft");
            SecondSlide.classList.remove("MovieSliderRight");
        } else if (Trailers[i].classList.contains("TrailerSliderLeft")) {
            FirstSlide = Trailers[i];
        } else if (Trailers[i].classList.contains("TrailerSliderRight")) {
            ThirdSlide = Trailers[i];
        }
    }
    if (dir == 0) {
        SecondSlide.classList.add("TrailerSliderRight");
        ReplaceClasses(FirstSlide, "TrailerSliderLeft", "MovieSliderLeft");
        ReplaceClasses(ThirdSlide, "TrailerSliderRight", "TrailerSliderLeft");
    } else if (dir == 1) {
        SecondSlide.classList.add("TrailerSliderLeft");
        ReplaceClasses(FirstSlide, "TrailerSliderLeft", "TrailerSliderRight");
        ReplaceClasses(ThirdSlide, "TrailerSliderRight", "MovieSliderRight");
    }

};
// change container bgImage to hoverd trailer box
TrailerBox.forEach(item => {
    item.addEventListener("mouseover", () => {
        let BGimage = item.childNodes[3].src;
        LatestTrailersSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url("${BGimage}")`;
    });

});
// play Trailer
PlayBtn.forEach(item => {
    item.addEventListener("click", () => {
        TrailerVideosContainer.style.display = "flex";
        PageOverlay.style.display = "flex";
    });
});
// CloseTrailer
if (CloseTrailer != null) {
    CloseTrailer.addEventListener("click", () => {
        TrailerVideo.pause();
        TrailerVideosContainer.style.display = "none";
        PageOverlay.style.display = "none";
    });
}
//Trailer slider

if (TrailerSliderArrow != null) {
    TrailerSliderArrow.addEventListener("click", (e) => {
        // slider Arrows
        if (e.target.nodeName === "I") {
            if (e.target.id === "RightArrow") {
                // 0 represents right arrow
                TrailersSlider(0, Trailers);
            } else if (e.target.id === "LeftArrow") {
                // 0 represents left arrow
                TrailersSlider(1, Trailers);
            }
        }
    });
}



//Movies Page 
const LoadMoreMoviesBtn = document.querySelector(".LoadMoreBtn");
const MoviesContainer = document.querySelector(".MoviesContainer");
if (MoviesContainer != null) {
    MoviesContainer.addEventListener("click", (e) => {
        //play trailer
        if (e.target.classList.contains("PlayTrailerBtn") || e.target.classList.contains("fa-play")) {
            e.preventDefault();
            TrailerVideosContainer.style.display = "flex";
            PageOverlay.style.display = "flex";
        }
        //Favorite Btn
        else if (e.target.classList.contains("FavoritesBtn") || e.target.classList.contains("RemoveFromFavorites") || e.target.classList.contains("fa-heart")) {
            e.preventDefault();
            if (e.target.classList.contains("RemoveFromFavorites")) {
                console.log("hey");
                ReplaceClasses(e.target, "RemoveFromFavorites", "AddToFavoritesBtn");
                e.target.innerHTML = `<span
                class="fa fa-heart">&nbsp;</span> افزودن به
            علاقه
            مندی
            ها`;
            } else if (e.target.classList.contains("AddToFavoritesBtn")) {
                ReplaceClasses(e.target, "AddToFavoritesBtn", "RemoveFromFavorites");
                e.target.innerHTML = `<span
                class="fa fa-heart">&nbsp;</span> حذف از
            علاقه
            مندی
            ها`;
            } else {
                let Parent = e.target.parentElement;
                if (Parent.classList.contains("RemoveFromFavorites")) {
                    ReplaceClasses(Parent, "RemoveFromFavorites", "AddToFavoritesBtn");
                    Parent.innerHTML = `<span
                    class="fa fa-heart">&nbsp;</span> افزودن به
                علاقه
                مندی
                ها`;
                } else if (Parent.classList.contains("AddToFavoritesBtn")) {
                    ReplaceClasses(Parent, "AddToFavoritesBtn", "RemoveFromFavorites");
                    Parent.innerHTML = `<span
                    class="fa fa-heart">&nbsp;</span> حذف از
                علاقه
                مندی
                ها`;
                }
            }
        }
    });
}

//Load more movies
if (LoadMoreMoviesBtn != null) {
    LoadMoreMoviesBtn.addEventListener("click", (e) => {
        for (let i = 0; i < 5; i++) {
            MoviesContainer.innerHTML += `
            <div class="MovieBox">
            <div class="MovieInformationContainer">
                <div class="MovieContent rtl">
                    <h2 class="c-main">سریال Arrow</h2>
                    <span><span class="c-white">ژانر: &nbsp;&nbsp;</span><span class="c-gray">ماجراجویی،
                            اکشن</span></span>
                    <span><span class="c-white">کارگردان: &nbsp;&nbsp;</span><span class="c-gray">
                            Brandon Miller Williams</span></span>
                    <span><span class="c-white">بازیگران: &nbsp;&nbsp;</span><span class="c-gray">
                            Stephen Amell, emilly bet, farid gahderi</span></span>
                    <p class="rtl c-white">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                        استفاده از
                        طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و
                        برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                        باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
                        می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی
                        و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام...</p>
                </div>
                <div class="MovieCover align-center"><img src="images/website/posts/series/arrow-poster.png"
                        alt=""></div>
            </div>
            <div class="MovieAction">
            <a href="Movie2.html" class="c-main GoToMoviePageBtn align-center"><span
            class="fa fa-long-arrow-left">&nbsp;&nbsp;</span> ادامه و
        دانلود </a>
                <a href="#" class="c-main FavoritesBtn RemoveFromFavorites"><span
                        class="fa fa-heart">&nbsp;&nbsp;</span>
                    حذف از
                    علاقه
                    مندی
                    ها </a>
                <a href="#" class="c-main  PlayTrailerBtn"><span class="fa fa-play">&nbsp;&nbsp;</span>مشاهده
                    تریلر</a>
            </div>
            <div class="NetworkLogo">
                <img src="images/website/Network Logos/dc.png" alt="dc universe">
                <h6>DC Universe</h6>
            </div>
        </div>
            `;
        }
        let ScrllY = scrollY;
        let n = 0;
        for (let i = 1; i < 1000; i++) {

            setTimeout(() => {
                scrollTo(scrollX, ScrllY + n++);
            }, 200);
        }

    });
}

//Movie Page 
//refrences
const TrailerBtn = document.querySelector(".ShowTrailerBtn");
const OpenGalleryBtn = document.querySelector(".OpenGalleryBtn");
const GalleryContainer = document.querySelector(".GalleryContainer");
const CloseGalleryBtn = document.querySelector(".CloseGallery");
const MainGalleryImg = document.querySelector(".MainGalleryImageContainer img");
const SubGalleryImg = document.querySelectorAll(".SubGalleryImagesContainer img");
const RatingStars = document.querySelectorAll(".RatingStarContainer i");
const ShowDownloadLinks = document.querySelector(".DownloadLinksContainer");
const CloseLinksPageBtn = document.querySelector(".CloseLinksPageBtn");
const DownloadLinksContainer = document.querySelector(".SeriesDlLinksConatianer");
// play Trailer
if (TrailerBtn != null) {
    TrailerBtn.addEventListener("click", () => {
        TrailerVideosContainer.style.display = "flex";
        PageOverlay.style.display = "flex";
    });
}
// CloseTrailer
if (CloseTrailer != null) {
    CloseTrailer.addEventListener("click", () => {
        TrailerVideo.pause();
        TrailerVideosContainer.style.display = "none";
        PageOverlay.style.display = "none";
    });
}

if (OpenGalleryBtn != null && CloseGalleryBtn != null) {
    //show movie gallery
    OpenGalleryBtn.addEventListener("click", () => {
        GalleryContainer.style.display = "flex";
        GalleryContainer.style.animation = "ShowLoginForm .2s forwards";
    });
    //Close Gallery
    CloseGalleryBtn.addEventListener("click", () => {
        GalleryContainer.style.animation = "HideLoginForm .2s forwards";
        setTimeout(() => {
            GalleryContainer.style.display = "none";
        }, 300);
    });
}
//Change Gallery Images
SubGalleryImg.forEach(item => {
    item.addEventListener("click", (e) => {
        let imgSrc = item.src;
        MainGalleryImg.style.animation = "repalceImage .5s";
        item.style.animation = "repalceImage .5s";
        setTimeout(() => {
            item.src = MainGalleryImg.src;
            MainGalleryImg.src = imgSrc;
            MainGalleryImg.style.animation = null;
            item.style.animation = null;
        }, 150);
    });
});
//Rating
RatingStars.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
        for (let i = 0; i <= index; i++) {
            ReplaceClasses(RatingStars[i], "c-white", "c-main");
        }
        if (index != 9) {
            for (let n = 9; n > index; n--) {
                ReplaceClasses(RatingStars[n], "c-main", "c-white");
            }
        }
        console.log(index);
    });
});
//Show downlaod links
if (ShowDownloadLinks != null) {
    ShowDownloadLinks.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.nodeName == "A" || e.target.nodeName == "SPAN") {
            DownloadLinksContainer.style.visibility = "visible";
            DownloadLinksContainer.style.animation = "ShowLoginForm .2s forwards";
        }
    });
}

//Close links page
if (CloseLinksPageBtn != null) {
    CloseLinksPageBtn.addEventListener("click", () => {
        DownloadLinksContainer.style.animation = "HideLoginForm .2s forwards";
        setTimeout(() => {
            DownloadLinksContainer.style.visibility = "hidden";
        }, 300);
    });
}
//Comments Section
const CommentsContainer = document.querySelector(".CommentsConatiner");
const CommentBox = document.querySelectorAll(".ReplyToCommentBtn");
const ReplyBtn = document.querySelectorAll(".ReplyToCommentBtn");
let ReplyForm;
if (CommentsContainer != null) {
    CommentsContainer.addEventListener("click", (e) => {
        e.preventDefault();
        //Open reply form
        if (e.target.classList.contains("ReplyToCommentBtn")) {
            ReplyForm = e.target.parentNode.parentNode.children[e.target.parentNode.children.length - 1];
            ReplyForm.style.display = 'flex';
            ReplyForm.style.animation = 'ShowForm .5s';
            //close reply form
        } else if (e.target.classList.contains("CloseReply") || e.target.classList.contains("fa-remove")) {
            ReplyForm.style.animation = 'HideForm .5s';
            setTimeout(() => {
                ReplyForm.style.display = null;
            }, 400);
            //send reply 
        } else if (e.target.classList.contains("SendReplyBtn") || e.target.classList.contains("fa-chevron-circle-up")) {
            let ConfirmMSG = document.querySelector(".CommentConfirmContainer");
            ReplyForm.style.animation = 'HideForm .5s';
            ConfirmMSG.style.display = "inline-block";
            setTimeout(() => {
                ReplyForm.style.display = null;
            }, 400);
            setTimeout(() => {
                ConfirmMSG.style.display = null;
            }, 3000);
            ConfirmMSG.style.animation = "ShowConfirm 4s .2s";
        }

    });
}

// Show More Comments
const ShowMoreCommentsBtn = document.querySelector(".ShowMoreCommentsBtn");
const CommentsSection = document.querySelector(".CommentsSection");
if (ShowMoreCommentsBtn != null) {
    ShowMoreCommentsBtn.addEventListener("click", () => {
        CommentsSection.innerHTML += `<div class="CommentBox">
        <img src="images/users/Mrym/avatar.png" alt="">
        <div class="CommentAction">
            <h4 class="c-white">Mrym</h4>
            <p>بهترینننننننننننن سریالی بود که تو عمرم دیده بودم، این سریال رو باید 1000 بار دید</p>
            <i class="fa fa-share ReplyToCommentBtn c-main"></i>
        </div>
        <!-- This form send replies to specific comments -->
        <form name="ReplyForm" class="ReplyForm align-center">
            <input type="text" placeholder="متن پاسخ خودتون رو وارد کنید">
            <button class="SendReplyBtn"><i class="fa fa-chevron-circle-up"></i></button>
            <button class="CloseReply"><i class="fa fa-remove"></i></button>
        </form>
    </div>
    <div class="CommentBox RepliedComment"><img src="images/users/Faridgh/avatar.jpg" alt="">
        <div class="CommentAction">
            <h4 class="c-white">Farid Ghaderi <span class="c-main">(ادمین)</span></h4>
            <p>بهتر ازش نداریم</p>
            <i class="fa fa-share ReplyToCommentBtn c-main"></i>
        </div>
        <!-- This form send replies to specific comments -->
        <form name="ReplyForm" class="ReplyForm align-center">
            <input type="text" placeholder="متن پاسخ خودتون رو وارد کنید">
            <button class="SendReplyBtn"><i class="fa fa-chevron-circle-up"></i></button>
            <button class="CloseReply"><i class="fa fa-remove"></i></button>
        </form>
    </div>
    <div class="CommentBox">
    <img src="images/users/AliAlpha/avatar.jpg" alt="">
    <div class="CommentAction">
        <h4 class="c-white">AliGolchinFard</h4>
        <p> سلام، روزتون بخیر، سریال سانسور هست؟</p>
        <i class="fa fa-share ReplyToCommentBtn c-main"></i>
    </div>
    <!-- This form send replies to specific comments -->
    <form name="ReplyForm" class="ReplyForm align-center">
        <input type="text" placeholder="متن پاسخ خودتون رو وارد کنید">
        <button class="SendReplyBtn"><i class="fa fa-chevron-circle-up"></i></button>
        <button class="CloseReply"><i class="fa fa-remove"></i></button>
    </form>
    </div>
    `;
    });
}

// Send Comment
const SendComment = document.querySelector("#Submit");
if (SendComment != null) {
    SendComment.addEventListener("click", (e) => {
        let ConfirmMSG = document.querySelector(".CommentConfirmContainer");
        ConfirmMSG.style.display = "inline-block";
        setTimeout(() => {
            ConfirmMSG.style.display = null;
        }, 5000);
        ConfirmMSG.style.animation = "ShowConfirm 6s .2s";
        let txt = document.querySelector(".PostCommentsSection textarea");
        console.log(txt.value = "");
    });
}