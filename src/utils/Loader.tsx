import classes from "./Loader.module.css";

const Loader = ({ position }: { position: string }) => {
  return (
    <div className={classes.lds_spinner + ` ${position} `}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
