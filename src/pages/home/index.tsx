import Card from "@/components/modules/home/Card";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage() {
  return (
    <div className="max-w-[1000px] mx-auto px-2 md:px-5 ">
      <p className="text-sm text-muted-foreground mt-5 border-b pb-1 mb-3">
        <FontAwesomeIcon icon={faBook} /> 10 books
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default HomePage;
