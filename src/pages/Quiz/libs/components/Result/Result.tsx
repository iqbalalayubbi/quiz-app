import { Flex, Button } from "~/libs/components/components";

const Result: React.FC = () => {
  const handleClick = () => {
    // Navigate to the quiz page
  };

  return (
    <>
      <h1>Your Score</h1>
      <h1>80</h1>
      <Flex>
        <Button
          type="primary"
          htmlType="button"
          label="Play Again"
          onClick={handleClick}
        />
        <Button
          type="secondary"
          htmlType="button"
          label="Back To Menu"
          onClick={handleClick}
        />
      </Flex>
    </>
  );
};

export { Result };
