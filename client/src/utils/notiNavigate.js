const notiNavigate = (noti, navigate) => {
  switch (noti.notiType) {
    case "matchingDone":
      break;

    case "matchingDoneCandidate":
      navigate(`/request`);
      navigate(0);
      break;

    case "matchingDoneReferrer":
      navigate(`/opening`);
      navigate(0);
      break;

    case "candidateReplyRequest":
      navigate(`/opening/${noti.requestId}`);
      navigate(0);

      break;

    case "refererRequestMoreInfo":
      break;

    case "requestRemindAction":
      break;

    case "openingRemindAction":
      break;

    default:
      break;
  }
};

export default notiNavigate;
