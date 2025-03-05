# Rubydoobydoo!

Helping JS be more Ruby.

Unashamedly monkey patching JS.

Ruby has loads of really nice methods, now you can use them in JS as well!

Write code like:

```javascript
[1,2,3].last // 3
[1,2,3].count // 3 
(21).ordinalize // "21st"
"Rubydoobydoo".reverse //m "oodyboodybuR"
[1,2,3].sum.squared // 9
["Gold","Gold","Bronze","Gold","Silver","Gold","Silver"].tally // {"Gold": 4, "Bronze": 1, "Silver": 2}
```

# Array Methods

## Property Methods

### `first`

Returns the first element of the array.

```javascript
[1, 2, 3].first; // 1
[].first; // undefined
```

### `second`, `third`, `fourth`, `fifth`

Returns the second, third, fourth, or fifth element of the array.

```javascript
[10, 20, 30].second; // 20
[10].third; // undefined
```

### `forty_two`

Returns the 42nd element (index 41) of the array.

```javascript
Array(50).fill(0).map((_, i) => i + 1).forty_two; // 42
```

### `third_to_last`, `second_to_last`, `last`

Returns the third-to-last, second-to-last, or last element of the array.

```javascript
[1, 2, 3, 4].second_to_last; // 3
[].last; // undefined
```

### `empty`

Returns true if the array is empty, false otherwise.

```javascript
[].empty; // true
[1].empty; // false
```

### `clear()`

Clears all elements from the array.

```javascript
let arr = [1, 2, 3];
arr.clear();
console.log(arr); // []
```

### `size`

Returns the length of the array.

```javascript
[1, 2, 3].size; // 3
```

### `min`, `max`

Returns the smallest or largest number in the array.

```javascript
[5, 3, 9].min; // 3
[5, 3, 9].max; // 9
[].min; // undefined
```

uniq

Description: Returns a new array with duplicate elements removed.

[1, 2, 2, 3].uniq; // [1, 2, 3]

to_sentence

Description: Converts the array into a human-readable sentence.

["a", "b", "c"].to_sentence; // "a, b and c"

compact

Description: Returns a new array with null and undefined values removed.

[1, null, 2, undefined, 3].compact; // [1, 2, 3]

to_param

Description: Converts the array into a string joined by /.

["users", 42, "edit"].to_param; // "users/42/edit"

Functional Methods

any(func?)

Description: Returns true if at least one element satisfies func, or if the array is not empty.

[1, 2, 3].any(x => x > 2); // true
[].any(); // false

one(func?)

Description: Returns true if exactly one element satisfies func.

[1, 2, 3].one(x => x > 2); // true
[1, 2, 3, 4].one(x => x > 2); // false

sum(func?)

Description: Returns the sum of all elements, or applies func before summing.

[1, 2, 3].sum(); // 6
[1, 2, 3].sum(x => x * 2); // 12

reject(func)

Description: Returns a new array without elements matching func.

[1, 2, 3, 4].reject(x => x % 2 === 0); // [1, 3]

partition(func)

Description: Splits the array into two: one matching func, one not.

[1, 2, 3, 4].partition(x => x % 2 === 0); // [[2, 4], [1, 3]]

count(func?)

Description: Returns the number of elements satisfying func, or the total length.

[1, 2, 3, 4].count(x => x % 2 === 0); // 2
[1, 2, 3].count(); // 3

pluck(prop)

Description: Extracts values of the given property from an array of objects.

[{id: 1}, {id: 2}].pluck("id"); // [1, 2]

from(n)

Description: Returns a new array starting from index n.

[10, 20, 30, 40].from(2); // [30, 40]

combination(n)

Description: Returns all possible combinations of n elements.

[1, 2, 3].combination(2); // [[1,2], [1,3], [2,3]]

tally()

Description: Counts occurrences of each unique element.

["a", "b", "a"].tally(); // { a: 2, b: 1 }

each_cons(n)

Description: Returns overlapping subarrays of size n.

[1, 2, 3, 4].each_cons(2); // [[1,2], [2,3], [3,4]]

rotate(n = 1)

Description: Returns a rotated array by n places.

[1, 2, 3].rotate(); // [2, 3, 1]

sample(n = 1)

Description: Returns n random elements.

[1, 2, 3, 4].sample(2); // Random subset

zip(arr)

Description: Zips two arrays together.

[1, 2, 3].zip(["a", "b", "c"]); // [[1, "a"], [2, "b"], [3, "c"]]

union(...arrs)

Description: Returns a merged array without duplicates.

[1, 2].union([2, 3], [3, 4]); // [1, 2, 3, 4]

Aliases

collect → map

all → every

select → filter

each → forEach

detect → find

inject → reduce

delete_if → reject

