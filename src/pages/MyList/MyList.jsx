import { useUserData } from "../../context/UserContext/UserContext";
import Grid from "../../components/recipes/Grid/Grid";

const MyList = () => {
  const { myList } = useUserData();

  return (
    <main className="page-container page-padding my-list-page">
      <h1>My List</h1>

      <Grid
        recipes={myList}
        isLoading={false}
        emptyMessage={
          <>
            <p>You haven't added any recipes to your list yet.</p>
            <span>
              Explore our recipes and click the "+" icon to save them here.
            </span>
          </>
        }
      />
    </main>
  );
};

export default MyList;
