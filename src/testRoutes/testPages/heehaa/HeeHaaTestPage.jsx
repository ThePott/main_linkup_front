import CircleIcon from "../../../shared/CircleIcon";

const HeeHaaTestPage = () => {
  return (
    <ul>
      {Artist.map((idol) => (
        <CircleIcon artist={idol} />
      ))}
    </ul>
  );
};

export default HeeHaaTestPage;

//더미데이터 - 지워야함
const Artist = [
  {
    id: 123,
    name: "IU",
    img_face:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 124,
    name: "IUU",
    img_face:
      "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
