import { Button } from "antd";

const AbhaDrawerHeader = ({
  isNextButton,
  onNext,
  isLoading,
  isNextDisable,
  headerText,
  headerIcon,
  nextBtnTitle,
}) => {
  return (
    <div className="abha_drawer_header">
      <h1 className="abha_drawer_header_text">
        {headerText}
        {headerIcon}
      </h1>
      {isNextButton && (
        <Button
          type="primary"
          onClick={onNext}
          loading={isLoading}
          disabled={isNextDisable}
          className={"abha_next_button"}
        >
          {nextBtnTitle}
        </Button>
      )}
    </div>
  );
};

export default AbhaDrawerHeader;
