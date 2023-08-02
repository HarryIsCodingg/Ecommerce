import {useDispatch, useSelector} from "react-redux";
import {selectCategories, setCategories, setIsProductDeleted} from "../../../../core/redux-store/slices/categorySlice";
import {useEffect} from "react";
import CategoryService from "../../../../core/services/CategoryService";
import './CategoryList.css';
import {Icon} from "@iconify/react";

const CategoryList = () => {

    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchCategories = async () => {
           const allCategories = await CategoryService.getAllCategories();
           dispatch(setCategories(allCategories));
        }
        fetchCategories();
    }, [dispatch])

    const deleteCategory = async (category) => {
        const response = await CategoryService.deleteCategory(category);
        dispatch(setCategories(response));

        dispatch(setIsProductDeleted(true))

        setTimeout(()=> (
            dispatch(setIsProductDeleted(false))
        ), 2000);
    }

    return (
        <div className='category-list-wrapper'>
            {categories.map((category)=> (
                <div className='category-item' key={category.name}>
                    <div className='item-content'>{category.name}
                        <Icon icon='fa6-solid:delete-left' className='delete-category pointer' fontSize={24} onClick={() => deleteCategory(category.name)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CategoryList;
