import Nav from "../_components/nav";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
}
