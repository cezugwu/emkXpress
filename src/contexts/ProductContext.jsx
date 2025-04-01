import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarContext } from './sidebarcontext';

export const ProductContext = createContext();

const ProductProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState(() => sessionStorage.getItem('search_') ? sessionStorage.getItem('search_') : '');
  const [filterName, setFilterName] = useState(() => sessionStorage.getItem('filter_') ? JSON.parse(sessionStorage.getItem('filter_')) : '');
  const navigate = useNavigate();
  const location = useLocation();
  const {setOpenside} = useContext(SidebarContext)


  const {min, max, category} = filterName;

  const getSearchName = (e) => {
    e.preventDefault();
    if (!e.target.searchName.value) {
      return;
    } else {
      setSearchName(e.target.searchName.value);
      sessionStorage.setItem('search_', e.target.searchName.value);

      if (location.pathname !== '/search') {
         navigate('/search');
      }
    }
  }

  const filterSearch = (e) => {
    e.preventDefault();
    
    if (!e.target.min.value && !e.target.max.value && !e.target.category.value) {
      return;
    } else {
      const min = e.target.min.value || '';
      const max = e.target.max.value || '';
      const category = e.target.category.value || '';
      const general = ({'min':min, 'max':max, 'category':category});
      console.log(general);
      setFilterName(general);
      sessionStorage.setItem('filter_', JSON.stringify(general));
      if (location.pathname !== '/search') {
        navigate('/search');
      }
      setOpenside(false);
    }
  }

  const clearFilter = async () => {
    sessionStorage.removeItem('filter_');
    setFilterName('');
    await getSearchedProduct();
  }

  const getProduct = useCallback(async () => {
    let url = `http://127.0.0.1:8000/products/`;

      try {
        let response = await fetch(url, {
        method:'GET',
        });
        let data = await response.json();
        if (response.status === 200) {
          setProducts(data);
          setLoading(false);
        } else {
          console.log('failed to fetch product')
        }
      } catch (error) {
          console.log('unexpected error', error)
      }
    }, []);


    const getSearchedProduct = useCallback(async () => {

      let url = `http://127.0.0.1:8000/search/?name__icontains=${searchName}`;
      let params = [];

      if (category) {
          params.push(`category__icontains=${category}`);
      }
      if (min && max) {
          params.push(`price__range=${min},${max}`);
      }

      if (params.length > 0) {
          url += `&${params.join('&')}`;
      }

      try {
        let response = await fetch(url, {
        method:'GET',
        });
        let data = await response.json();
        if (response.status === 200) {
          setSearchedProducts(data);
          setLoading(false);
        } else {
          console.log('failed to fetch product')
        }
      } catch (error) {
          console.log('unexpected error', error)
      }
    }, [searchName, category, min, max]);


  return (
    <ProductContext.Provider value={{products, searchedProducts, getSearchedProduct, getProduct, loading, getSearchName, searchName, setSearchName, filterSearch, clearFilter}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
