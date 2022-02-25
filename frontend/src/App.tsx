import { useState, useEffect } from "react"
import { bestsellersService } from "./services/bestsellersService"

export const App = () => {
  const [bestsellerLists, setBestsellerLists] = useState<any[]>([])

  useEffect(() => {
    const getBestsellerLists = async () => {
      setBestsellerLists(await bestsellersService.getBestsellerLists())
    }

    getBestsellerLists()
  }, [])

  return (
    <ul>
      {bestsellerLists.map(bestsellerList => (
        <li key={bestsellerList.list_name_encoded}>
          {bestsellerList.list_name}
        </li>
      ))}
    </ul>
  );
}