import { Button as MuiButton } from "@mui/material";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
const Button = (props: ButtonProps) => {
  console.info(props);
  return (
    <MuiButton
      onClick={props?.onClick}
      variant="contained"
      className="bg-orange-600 shadow-md transition-colors hover:bg-slate-200"
    >
      {props.children}
    </MuiButton>
  );
};

export { Button };
