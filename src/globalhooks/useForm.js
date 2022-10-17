import { useEffect, useMemo, useState } from 'react';


export const useForm = ( initialForm = {}, formValidations = {} ) => {
    const [ formState, setFormState ] = useState( initialForm );

    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidators()
    }, [formState])
    
    // "useMemo" para que solo se ejecute cuando el "formValidation" cambie
    const isFormValid = useMemo(() => {

        // DE ESTA MANERA NO ME FUNCIONA a pesar de que es lo mismo... Y es porque como estoy dentro de un "forEach" estoy devolviendo nada mas un "return false" que se saldra SOLAMENTE de ese "forEach" (ya que recibe un "callBack")
        // Object.keys(formValidation).forEach(formValue => {
        //     if(formValidation[formValue] !== null) return false;
        //     // console.log('>> ', formValue)
        //     // console.log(formValidation[formValue])
        //     console.log(formValidation)
        // })

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
            // console.log('## ', formValue)
            // console.log(formValidation[formValue])
            // console.log(formValidation)
        }

        return true;
    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }
    
    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField]

            // A esto se le llama "Propiedades Computadas" (le tendre que dar una ojeada)...
            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }

        // console.log(formCheckValues)
        setFormValidation(formCheckValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    }
}