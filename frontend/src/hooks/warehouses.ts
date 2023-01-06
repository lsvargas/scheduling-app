import { useEffect, useState } from "react"

interface IWarehouse {
  id: number;
  name: string;
  opening_time: string;
  close_time: string;
}

const useFetchWarehouses = () => {
  const [warehouses, setWarehouses] = useState<IWarehouse[]>()

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await (await fetch("http://localhost:4000/warehouses")).json()
        setWarehouses(response)
      } catch (err) {
        console.log(err)
      }
    }
    fetchWarehouses();
  }, [])

  return {
    loading: !warehouses,
    error: null,
    warehouses,
  }
}

const useFetchWarehouse = (id: string | undefined) => {
  const [warehouse, setWarehouse] = useState<IWarehouse>()

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await (await fetch(`http://localhost:4000/warehouses/${id}`)).json()
        setWarehouse(response)
      } catch (err) {
        console.log(err)
      }
    }
    if (id) fetchWarehouses();
  }, [])


  return {
    wareHouseLoading: !warehouse,
    error: null,
    warehouse,
  }
}

export {
  useFetchWarehouses,
  useFetchWarehouse
}