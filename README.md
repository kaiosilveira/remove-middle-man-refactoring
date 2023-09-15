[![Continous Integration](https://github.com/kaiosilveira/remove-middle-man-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/remove-middle-man-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Remove middle man

<table>
<thead>
<tr>
<th>Before</th>
<th>After</th>
</tr>
</thread>
<tobdy>
<tr>
<td>

```javascript
class Person {
  get manager() {
    return this._department.manager;
  }
  // ...
}
```

</td>

<td>

```javascript
manager = aPerson.department.manager;
```

</td>

</tr>
</tobdy>
</table>

**Inverse of: [Hide Delegate](https://github.com/kaiosilveira/hide-delegate-refactoring)**

Encapsulation comes with a price: many small chunks of code hiding internal details and doing tiny bits of processing here and there. Although it's a good guideline to keep our code encapsulated and modular enough, there's always a blurred space where these guidelines can take us too far. This refactoring helps to revert our path when we find ourselves in this situation.

## Working example

As our working example, we're going to use the same code scenario presented at **[Hide Delegate](https://github.com/kaiosilveira/hide-delegate-refactoring)**, where a `Person` class contains a `maanger` getter, that hides a delegate to `department.manager`. Our goal here, though, is the inverse of that: we want to remove this getter, so clients access the `department` property directly.

### Test suite

Our test suite remains the same: we cover the `getManager()` function, to make sure it keeps returning the expected data while we perform our refactoring steps:

```javascript
describe('getManager', () => {
  it('should fetch the manager of a person', () => {
    const department = new Department();
    department.chargeCode = '123';
    department.manager = 'Martin';

    const aPerson = new Person({ name: 'Kaio' });
    aPerson.department = department;

    expect(getManager(aPerson)).toEqual('Martin');
  });
});
```

### Steps

We start by introducing a `department` getter at `Person`:

```diff
diff --git a/src/Person.js b/src/Person.js
@@ -14,4 +14,8 @@
export class Person {
   set department(arg) {
     this._department = arg;
   }
+
+  get department() {
+    return this._department;
+  }
 }
```

Then, we can update `Person`'s clients to use the `department` getter:

```diff
diff --git a/src/client/index.js b/src/client/index.js
@@ -1,4 +1,4 @@
 export function getManager(aPerson) {
-  const manager = aPerson.manager;
+  const manager = aPerson.department.manager;
   return manager;
 }
```

Finally, we can remove the `manager` getter altogether:

```diff
diff --git a/src/Person.js b/src/Person.js
@@ -7,10 +7,6 @@
export class Person {
     return this._name;
   }

-  get manager() {
-    return this._department.manager;
-  }
-
   set department(arg) {
     this._department = arg;
   }
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                               | Message                                        |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| [790549f](https://github.com/kaiosilveira/remove-middle-man-refactoring/commit/790549fcd4cad93c2298e9878c2c47e7543fd7dd) | introduce department getter at Person          |
| [c928bd8](https://github.com/kaiosilveira/remove-middle-man-refactoring/commit/c928bd898df2dfc0e72891c904b904d0ab35545a) | update Person clients to use department getter |
| [2ebb052](https://github.com/kaiosilveira/remove-middle-man-refactoring/commit/2ebb0521afe4dab1e36b909fced6f42941bb4464) | remove manager getter                          |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/remove-middle-man-refactoring/commits/main).
