import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { useSelector } from "react-redux";
import { PiForkKnife } from "react-icons/pi";

export default function Allproduct({heading}) {
  const productdata = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productdata.map((el) => el.category))];
  console.log(categoryList, "helooooooo caatatataata");
  const loadingArryFeature = new Array(10).fill(null);
  //filtrer data dispaly
  const [filterby, setFilterby] = useState("");
  const [datafilterby, setDatafilterby] = useState([]);
  
  useEffect(() => {
    setDatafilterby(productdata);
  }, [productdata]);

  const handleFilterby = (category) => {
    setFilterby(category)
    setDatafilterby(() => {
      const filter = productdata.filter((el) => el.category === category);
      return [...filter];
    });
  };
  return (
    <div>
      <div className="">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
        <div className="flex gap-4 justify-center">
          {categoryList[0] ?
            categoryList.map((el,index) => {
              return (
                <FilterProduct
                   key={index+"category"}
                  category={el}
                  isActive={el.toLowerCase() ===filterby.toLowerCase()}
                  click={() => {
                    handleFilterby(el);
                  }}
                />
              );
            })
         : 
         <div className="flex flex-col items-center ">
          <div className='text-3xl p-5 w-fit bg-yellow-500 rounded-full cursor-pointer '>
              
              <PiForkKnife/>
              
          </div>
          <p className='text-center font-medium my-1 capitalize'> ...loading  Category</p>
          </div>
        
        }
        </div>
        <div className="flex flex-wrap justify-center gap-4 ">
          {datafilterby[0 ]?datafilterby.map((El) => {
            return (
              <CardFeature
                key={El._id +'datafiltry'}
                _id={El._id}
                image={El.image}
                name={El.name}
                category={El.category}
                price={El.price}
              />
            )
          }):<>
         

          
          <>{ loadingArryFeature.map((el, index ) => (
              <CardFeature   key={index} loading={"...loading"} />
            ))}
         </></>
        }
        </div>
      </div>
    </div>
  );
}
