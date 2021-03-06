#include <stdint.h>
#include "macros.h"
#include "array.h"

#ifndef SPEEDYJS_RUNTIME_ARRAY_API_H
#define SPEEDYJS_RUNTIME_ARRAY_API_H

// see RuntimeSystemNameMangler for the naming schema used


#ifdef __cplusplus
extern "C" {
#endif

//---------------------------------------------------------------------------------
// new
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_constructori(int32_t size) {
    return new Array<bool> { size, nullptr };
}

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_constructorPbi(bool* const elements, int32_t size) {
    return new Array<bool> { size, elements };
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_constructori(int32_t size) {
    return new Array<int32_t> { size, nullptr };
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_constructorPii(int32_t* const elements, int32_t size) {
    return new Array<int32_t> { size, elements };
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_constructori(const int32_t size) {
    return new Array<double> { size, nullptr };
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_constructorPdi(double* const elements, int32_t size) {
    return new Array<double> { size, elements };
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_constructori(int32_t size) {
    return new Array<void*> { size, nullptr };
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_constructorPvi(void** const elements, int32_t size) {
    return new Array<void*> { size, elements };
}

//---------------------------------------------------------------------------------
// get
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE bool ArrayIb_geti(const Array<bool>* const array, int32_t index) {
    return array->get(index);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_geti(const Array<int32_t>* const array, int32_t index) {
    return array->get(index);
}

DLL_PUBLIC ALWAYS_INLINE double ArrayId_geti(const Array<double>* const array, int32_t index) {
    return array->get(index);
}

DLL_PUBLIC ALWAYS_INLINE void* ArrayIPv_geti(const Array<void*>* const array, int32_t index) {
    return array->get(index);
}

//---------------------------------------------------------------------------------
// set
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_setib(Array<bool>* const array, int32_t index, bool value) {
    array->set(index, value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_setii(Array<int32_t>* const array, int32_t index, int32_t value) {
    array->set(index, value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_setid(Array<double>* const array, int32_t index, double value) {
    array->set(index, value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_setiPv(Array<void*>* const array, int32_t index, void* value) {
    array->set(index, value);
}

//---------------------------------------------------------------------------------
// fill
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_fillb(Array<bool>* const array, bool value) {
    array->fill(value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_fillbi(Array<bool>* const array, bool value, int32_t start) {
    array->fill(value, start);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_fillbii(Array<bool>* const array, bool value, int32_t start, int32_t end) {
    array->fill(value, start, end);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_filli(Array<int32_t>* const array, int32_t value) {
    array->fill(value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_fillii(Array<int32_t>* const array, int32_t value, int32_t start) {
    array->fill(value, start);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_filliii(Array<int32_t>* const array, int32_t value, int32_t start, int32_t end) {
    array->fill(value, start, end);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_filld(Array<double>* const array, double value) {
    array->fill(value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_filldi(Array<double>* const array, double value, int32_t start) {
    array->fill(value, start);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_filldii(Array<double>* const array, double value, int32_t start, int32_t end) {
    array->fill(value, start, end);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_fillPv(Array<void*>* const array, void* value) {
    array->fill(value);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_fillPvi(Array<void*>* const array, void* value, int32_t start) {
    array->fill(value, start);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_fillPvii(Array<void*>* const array, void* value, int32_t start, int32_t end) {
    array->fill(value, start, end);
}

//---------------------------------------------------------------------------------
// push
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIb_pushPbi(Array<bool>* const array, bool* elements, int32_t numElements) {
    return array->push(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_pushPii(Array<int32_t>* const array, int32_t* elements, int32_t numElements) {
    return array->push(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayId_pushPdi(Array<double>* const array, double* elements, int32_t numElements) {
    return array->push(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIPv_pushPvi(Array<void*>* const array, void** elements, int32_t numElements) {
    return array->push(elements, numElements);
}

//---------------------------------------------------------------------------------
// unshift
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIb_unshiftPbi(Array<bool>* const array, bool* elements, int32_t numElements) {
    return array->unshift(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_unshiftPii(Array<int32_t>* const array, int32_t* elements, int32_t numElements) {
    return array->unshift(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayId_unshiftPdi(Array<double>* const array, double* elements, int32_t numElements)  {
    return array->unshift(elements, numElements);
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIPv_unshiftPvi(Array<void*>* const array, void** elements, int32_t numElements) {
    return array->unshift(elements, numElements);
}

//---------------------------------------------------------------------------------
// pop
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE bool ArrayIb_pop(Array<bool>* const array) {
    return array->pop();
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_pop(Array<int32_t>* const array) {
    return array->pop();
}

DLL_PUBLIC ALWAYS_INLINE double ArrayId_pop(Array<double>* const array) {
    return array->pop();
}

DLL_PUBLIC ALWAYS_INLINE void* ArrayIPv_pop(Array<void*>* const array) {
    return array->pop();
}

//---------------------------------------------------------------------------------
// shift
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE bool ArrayIb_shift(Array<bool>* const array) {
    return array->shift();
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_shift(Array<int32_t>* const array) {
    return array->shift();
}

DLL_PUBLIC ALWAYS_INLINE double ArrayId_shift(Array<double>* const array) {
    return array->shift();
}

DLL_PUBLIC ALWAYS_INLINE void* ArrayIPv_shift(Array<void*>* const array) {
    return array->shift();
}

//---------------------------------------------------------------------------------
// slice
//---------------------------------------------------------------------------------
DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_slice(const Array<bool>* const array) {
    return array->slice();
}

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_slicei(const Array<bool>* const array, int32_t start) {
    return array->slice(start);
}

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_sliceii(const Array<bool>* const array, int32_t start, int32_t end) {
    return array->slice(start, end);
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_slice(const Array<int32_t>* const array) {
    return array->slice();
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_slicei(const Array<int32_t>* const array, int32_t start) {
    return array->slice(start);
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_sliceii(const Array<int32_t>* const array, int32_t start, int32_t end) {
    return array->slice(start, end);
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_slice(const Array<double>* const array) {
    return array->slice();
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_slicei(const Array<double>* const array, int32_t start) {
    return array->slice(start);
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_sliceii(const Array<double>* const array, int32_t start, int32_t end) {
    return array->slice(start, end);
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_slice(const Array<void*>* const array) {
    return array->slice();
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_slicei(const Array<void*>* const array, int32_t start) {
    return array->slice(start);
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_sliceii(const Array<void*>* const array, int32_t start, int32_t end) {
    return array->slice(start, end);
}

//---------------------------------------------------------------------------------
// splice
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_splicei(Array<bool>* const array, int32_t index) {
    return array->splice(index, array->size());
}

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_spliceii(Array<bool>* const array, int32_t index, int32_t deleteCount) {
    return array->splice(index, deleteCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<bool>* ArrayIb_spliceiiPbi(Array<bool>* const array, int32_t index, int32_t deleteCount, bool* elements, int32_t elementsCount) {
    return array->splice(index, deleteCount, elements, elementsCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_splicei(Array<int32_t>* const array, int32_t index) {
    return array->splice(index, array->size());
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_spliceii(Array<int32_t>* const array, int32_t index, int32_t deleteCount) {
    return array->splice(index, deleteCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<int32_t>* ArrayIi_spliceiiPii(Array<int32_t>* const array, int32_t index, int32_t deleteCount, int32_t* elements, int32_t elementsCount) {
    return array->splice(index, deleteCount, elements, elementsCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_splicei(Array<double>* const array, int32_t index) {
    return array->splice(index, array->size());
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_spliceii(Array<double>* const array, int32_t index, int32_t deleteCount) {
    return array->splice(index, deleteCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<double>* ArrayId_spliceiiPdi(Array<double>* const array, int32_t index, int32_t deleteCount, double* elements, int32_t elementsCount) {
    return array->splice(index, deleteCount, elements, elementsCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_splicei(Array<void*>* const array, int32_t index) {
    return array->splice(index, array->size());
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_spliceii(Array<void*>* const array, int32_t index, int32_t deleteCount) {
    return array->splice(index, deleteCount);
}

DLL_PUBLIC ALWAYS_INLINE Array<void*>* ArrayIPv_spliceiiPvi(Array<void*>* const array, int32_t index, int32_t deleteCount, void** elements, int32_t elementsCount) {
    return array->splice(index, deleteCount, elements, elementsCount);
}

//---------------------------------------------------------------------------------
// length
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIb_length(const Array<bool>* const array) {
    return array->size();
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIi_length(const Array<int32_t>* const array) {
    return array->size();
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayId_length(const Array<double>* const array) {
    return array->size();
}

DLL_PUBLIC ALWAYS_INLINE int32_t ArrayIPv_length(const Array<void*>* const array) {
    return array->size();
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_lengthi(Array<bool>* const array, int32_t size) {
    array->resize(size);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_lengthi(Array<int32_t>* const array, int32_t size) {
    array->resize(size);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_lengthi(Array<double>* const array, int32_t size) {
    array->resize(size);
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_lengthi(Array<void*>* const array, int32_t size) {
    array->resize(size);
}

//---------------------------------------------------------------------------------
// free
//---------------------------------------------------------------------------------

DLL_PUBLIC ALWAYS_INLINE void ArrayIb_free(Array<bool>* array) {
    delete array;
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIi_free(Array<int32_t>* array) {
    delete array;
}

DLL_PUBLIC ALWAYS_INLINE void ArrayId_free(Array<double>* array) {
    delete array;
}

DLL_PUBLIC ALWAYS_INLINE void ArrayIPv_free(Array<void*>* array) {
    delete array;
}

#ifdef __cplusplus
}
#endif


#endif //SPEEDYJS_RUNTIME_ARRAY_API_H
