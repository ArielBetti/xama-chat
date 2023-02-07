import { Header, ProfilePicture, Sidebar } from "@/components";
import useAmountAuthRoute from "@/hooks/useAmountAuthRoute";
import { Bars3Icon } from '@heroicons/react/24/outline';
import { supabase } from "@/lib/initSupabase";
import { useSignOutUserMutation } from "@/queries/useSignOutUserMutation";

export default function Teste() {
  const { userLoader } = useAmountAuthRoute();
  const signOut = useSignOutUserMutation();

  const test = async () => {
    const { data, error } = await supabase.from("users").select("*");
  };

  return (
    <div className="h-screen flex">
      <Sidebar user={userLoader || null} header={<h1>Channels</h1>} />
      <div className="relative flex flex-col h-full w-full">
        <Header title="Um titulo legal aqui" />
        <div className="gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto">
          <div className="bg-blue-700/50 border border-blue-400 p-5 rounded-md shadow-md flex w-full py-5 max-w-7xl justify-start">
            <div className="flex gap-5 items-start justify-start md:flex-nowrap flex-wrap">
              <ProfilePicture
                url={`${userLoader?.picture}`}
                fallback={`${userLoader?.name}`}
              />
              <div className="flex flex-col justify-start gap-2">
              <div className="flex gap-5 items-baseline justify-start">
              <span className="font-semibold">{userLoader?.name}</span>
              <span className="text-xs">10:20</span>
              </div>
              <div className="flex flex-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fuga quis ratione reprehenderit aperiam tempore, facilis eveniet in, sequi nemo quae fugiat consectetur magnam cumque quod veniam quisquam laborum temporibus?
                Corrupti non illum reiciendis ad minus in a eligendi neque quidem, porro qui quis voluptate eum rerum atque modi odio vero rem doloremque deleniti excepturi amet? Soluta, odio. Aspernatur, praesentium.
                Consectetur ipsam dolores quis nam ad qui accusantium quod, ut architecto odit magnam fugiat sed beatae ex, molestiae reprehenderit est, voluptate vero asperiores. Quisquam repudiandae iure ex eum! A, pariatur?
                Suscipit in molestias nobis at qui esse possimus numquam ullam magnam voluptatum eaque saepe rem provident et, alias, consequatur dolore! Possimus rem omnis amet esse soluta nobis repellat quae laudantium!
                Voluptatibus reiciendis, animi velit possimus doloremque aspernatur in voluptatum voluptate pariatur minima vel illum porro, iure maiores architecto corporis odit. Officia, autem. In, corrupti eos dolorum quae dolore quaerat ullam!
                Laboriosam cumque ad laudantium sapiente perspiciatis eaque nisi, aperiam pariatur labore recusandae esse dolore provident enim aspernatur facere consequuntur animi mollitia culpa, repellendus sed possimus minima, est molestias asperiores. Explicabo?
                Asperiores et illo repudiandae suscipit quis corrupti ipsa modi itaque numquam fugit consequuntur odio accusantium eveniet a inventore eum repellat quod dolor ut possimus, perferendis expedita molestias est hic? Doloribus.
                Suscipit, ipsum! Doloribus sed veritatis eligendi minima, commodi corporis voluptas atque non vitae at voluptatibus adipisci aut laborum quos nisi quam. Veritatis accusamus vero cum qui similique quis, veniam exercitationem.
                Sapiente, nulla earum? Saepe enim, quaerat nesciunt adipisci, sequi temporibus voluptatum ipsum dolorem iure, maiores nisi voluptate amet consequuntur deleniti tempora eius aspernatur officiis quo incidunt magni? Quasi, error dolores.
                Maiores, architecto reiciendis voluptas magni labore consequuntur maxime, provident expedita iure odit asperiores ipsa iste recusandae accusantium quae eum. Ea quibusdam doloremque odit! Illo architecto consectetur optio similique voluptatem provident.
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full min-h-[70px] max-h-90"></div>
      </div>
    </div>
  );
}
