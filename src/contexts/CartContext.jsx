import { jwtDecode } from 'jwt-decode';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {
  const [cart, setCart] = useState([]);
  const [totalItem, setTotaItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  localStorage.setItem('cart', JSON.stringify(cart));


  useEffect(() => {
    const total = [...cart].reduce((accu, item) => (
      accu + item.quantity
    ), 0);
    setTotaItem(total);
  }, [cart]); 

  useEffect(() => {
    const total = [...cart].reduce((accu, item) => (
      accu + (item.quantity * item.price)
    ), 0);
    setTotalPrice(total);
  }, [cart])
  

    //complicated non user
  const createCart = useCallback(async () => {
    const authData = JSON.parse(localStorage.getItem('auth_'))
    const user = authData ? jwtDecode(authData.access) : ''

    if (!user) {
      const cart_code = localStorage.getItem('cart_code');
      try {
      let response = await fetch(`http://127.0.0.1:8000/createcart/`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({'cart_code':cart_code}),
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('failed to create cart');
      }
    } catch (error) {
      console.log('unexpected error')
    } 
    } else {
      const username = user.username;
      try {
      let response = await fetch(`http://127.0.0.1:8000/createcartu/`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${authData.access}`,
        },
        body:JSON.stringify({'username':username}),
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('failed to create cart');
      }
    } catch (error) {
      console.log('unexpected error')
    }
    }
  }, [])


  const deleteCart = async () => {
    const cart_code = localStorage.getItem('cart_code')
    try {
      let response = await fetch(`http://127.0.0.1:8000/deletecart/`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({'cart_code':cart_code}),
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('failed to delete cart');
      }
    } catch (error) {
      console.log('unexpected error')
    }
  }

  const deleteCartItems = async () => {
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';

    if (!user) {
      const cart_code = localStorage.getItem('cart_code');

      try {
        let response = await fetch(`http://127.0.0.1:8000/deleteitem/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({'cart_code':cart_code}),
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
          setCart([]);
        } else {
          console.log('failed to delete cartitems')
        }
      } catch (error) {
        console.log('unexpected error', error)
      }
    }
    
    //for users
    else {
      const username = user.username;

      try {
        let response = await fetch(`http://127.0.0.1:8000/deleteitemu/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${authData.access}`
          },
          body:JSON.stringify({'username':username}),
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
          setCart([]);
        } else {
          console.log('failed to delete cartitems')
        }
      } catch (error) {
        console.log('unexpected error', error)
      }
    }
  }


  const getCart = useCallback(async () => {
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';

    if (!user) {
      const cart_code = localStorage.getItem('cart_code');
      try {
        let response = await fetch(`http://127.0.0.1:8000/cart/?cart_code=${cart_code}`, {
          method:'GET',
        });
        let data = await response.json();
        if (response.status === 200) {
          setTotaItem(data.total_item);
          setTotalPrice(data.total_price);
          const product = data.cartitem.map(item => ({
            ...item.product,
            quantity:item.quantity
          }));
          setCart(product);

        } else {
          console.log('failed to load cart')
        }
      } catch (error) {
        console.log('unexpected error', error)
      }
    } 
    
    // for user
    else {
      const username = user.username;
      try {
        let response = await fetch(`http://127.0.0.1:8000/cartu/?username=${username}`, {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${authData.access}`,
          },
        });
        let data = await response.json();
        if (response.status === 200) {
          setTotaItem(data.total_item);
          setTotalPrice(data.total_price);
          const product = data.cartitem.map(item => ({
            ...item.product,
            quantity:item.quantity
          }));
          setCart(product);

        } else {
          console.log('failed to load cart')
        }
      } catch (error) {
        console.log('unexpected error', error)
      }
    }
  }, []);


  useEffect(() => {
    const runCartProcress = async () => {
      await createCart();
      await getCart();
    }
    runCartProcress();
  }, [createCart, getCart]);


  const addProduct = async (product) => {
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';

    if (!user) {
      const newItem = {...product, quantity:1}
      const cartItem = [...cart].find(item => item.id === product.id);

      if (cartItem) {
        const newCart = cart.map(item => 
          item.id === product.id ? 
          {...item, quantity:item.quantity + 1} : item
        );
        setCart(newCart)
      } else {
        setCart([...cart, newItem])
      }

      const cart_code = localStorage.getItem('cart_code');
      try {
        let response = await fetch(`http://127.0.0.1:8000/add/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({'cart_code':cart_code, 'product_id':product.id})
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
        } else {
          console.log('failed to add product');
        }
      } catch (error) {
        console.log('unexpected error', error);
      }
    } 

    // for user
    
    else {
      const newItem = {...product, quantity:1}
      const cartItem = [...cart].find(item => item.id === product.id);

      if (cartItem) {
        const newCart = cart.map(item => 
          item.id === product.id ? 
          {...item, quantity:item.quantity + 1} : item
        );
        setCart(newCart)
      } else {
        setCart([...cart, newItem])
      }

      const username = user.username;
      try {
        let response = await fetch(`http://127.0.0.1:8000/addu/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${authData.access}`,
          },
          body:JSON.stringify({'username':username, 'product_id':product.id})
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
        } else {
          console.log('failed to add product');
        }
      } catch (error) {
        console.log('unexpected error', error);
      }
    }
  }

  const updateProduct = async (item, action) => {
    const authData = JSON.parse(localStorage.getItem('auth_'));
    const user = authData ? jwtDecode(authData.access) : '';

    if (!user) {
      const cartItem = cart.find(items => items.id === item.id);

      if (cartItem) {
        if (action === "add") {
          const newCart = cart.map(items =>
            items.id === item.id ? { ...items, quantity: items.quantity + 1 } : items
          );
          setCart(newCart);
        } else if (action === "minus") {
          if (cartItem.quantity > 1) {
            const newCart = cart.map(items =>
              items.id === item.id ? { ...items, quantity: items.quantity - 1 } : items
            );
            setCart(newCart);
          } else {
            setCart(cart.filter(items => items.id !== item.id));
          }
        } else if (action === "remove") {
          setCart(cart.filter(items => items.id !== item.id));
        }
      }


      const cart_code = localStorage.getItem('cart_code');
      try {
        let response = await fetch(`http://127.0.0.1:8000/update/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({'cart_code':cart_code, 'product_id':item.id, 'action':action})
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
        } else {
          console.log('failed to update product')
        }
      } catch (error) {
        console.log('unexpected error', error);
      }
    } 
    
    //for user
    else {
      const cartItem = cart.find(items => items.id === item.id);

      if (cartItem) {
        if (action === "add") {
          const newCart = cart.map(items =>
            items.id === item.id ? { ...items, quantity: items.quantity + 1 } : items
          );
          setCart(newCart);
        } else if (action === "minus") {
          if (cartItem.quantity > 1) {
            const newCart = cart.map(items =>
              items.id === item.id ? { ...items, quantity: items.quantity - 1 } : items
            );
            setCart(newCart);
          } else {
            setCart(cart.filter(items => items.id !== item.id));
          }
        } else if (action === "remove") {
          setCart(cart.filter(items => items.id !== item.id));
        }
      }


      const username = user.username;
      try {
        let response = await fetch(`http://127.0.0.1:8000/updateu/`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${authData.access}`,
          },
          body:JSON.stringify({'username':username, 'product_id':item.id, 'action':action})
        });
        let data = await response.json();
        if (response.status === 200) {
          console.log(data);
        } else {
          console.log('failed to update product')
        }
      } catch (error) {
        console.log('unexpected error', error);
      }
    }
  }


  const appendCart = async(datas) => {
    const user = jwtDecode(datas.access);
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    if (products.length === 0) {
      return;
    }

    try {
      let response = await fetch(`http://127.0.0.1:8000/append/`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${datas.access}`,
        },
        body:JSON.stringify({'products':products, 'username':user.username})
      });
      let data = await response.json();
      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('failed to add product')
      }
    } catch (error) {
      console.log('unexpected error')
    }
  }

  return (
    <CartContext.Provider value={{addProduct, cart, totalItem, totalPrice, updateProduct, getCart, setCart, setTotaItem, setTotalPrice, appendCart, createCart, deleteCart, deleteCartItems}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
