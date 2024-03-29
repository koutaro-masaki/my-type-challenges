import fetch from "node-fetch";
import { writeFileSync } from "fs";

const problems = [
  {
    number: 2,
    title: "Get Return Type",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 3,
    title: "Omit",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00003-medium-omit/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 4,
    title: "Pick",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 5,
    title: "Get Readonly Keys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00005-extreme-readonly-keys/README.md",
    hasJp: true,
    difficulty: "extreme",
  },
  {
    number: 6,
    title: "Simple Vue",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 7,
    title: "Readonly",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 8,
    title: "Readonly 2",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00008-medium-readonly-2/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 9,
    title: "Deep Readonly",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 10,
    title: "Tuple to Union",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00010-medium-tuple-to-union/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 11,
    title: "Tuple to Object",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 12,
    title: "Chainable Options",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 13,
    title: "Hello World",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00013-warm-hello-world/README.md",
    hasJp: true,
    difficulty: "warm-up",
  },
  {
    number: 14,
    title: "First of Array",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 15,
    title: "Last of Array",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 16,
    title: "Pop",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 17,
    title: "Currying 1",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00017-hard-currying-1/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 18,
    title: "Length of Tuple",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 20,
    title: "Promise.all",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 43,
    title: "Exclude",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 55,
    title: "Union to Intersection",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00055-hard-union-to-intersection/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 57,
    title: "Get Required",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00057-hard-get-required/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 59,
    title: "Get Optional",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00059-hard-get-optional/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 62,
    title: "Type Lookup",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 89,
    title: "Required Keys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00089-hard-required-keys/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 90,
    title: "Optional Keys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00090-hard-optional-keys/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 106,
    title: "Trim Left",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 108,
    title: "Trim",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 110,
    title: "Capitalize",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00110-medium-capitalize/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 112,
    title: "Capitalize Words",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00112-hard-capitalizewords/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 114,
    title: "CamelCase",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00114-hard-camelcase/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 116,
    title: "Replace",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 119,
    title: "ReplaceAll",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00119-medium-replaceall/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 147,
    title: "C-printf Parser",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00147-hard-c-printf-parser/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 151,
    title: "Query String Parser",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00151-extreme-query-string-parser/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 189,
    title: "Awaited",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 191,
    title: "Append Argument",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 213,
    title: "Vue Basic Props",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00213-hard-vue-basic-props/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 216,
    title: "Slice",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00216-extreme-slice/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 223,
    title: "IsAny",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00223-hard-isany/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 268,
    title: "If",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 270,
    title: "Typed Get",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00270-hard-typed-get/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 274,
    title: "Integers Comparator",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00274-extreme-integers-comparator/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 296,
    title: "Permutation",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00296-medium-permutation/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 298,
    title: "Length of String",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00298-medium-length-of-string/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 300,
    title: "String to Number",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00300-hard-string-to-number/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 399,
    title: "Tuple Filter",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00399-hard-tuple-filter/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 459,
    title: "Flatten",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00459-medium-flatten/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 462,
    title: "Currying 2",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00462-extreme-currying-2/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 472,
    title: "Tuple to Enum Object",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00472-hard-tuple-to-enum-object/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 476,
    title: "Sum",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00476-extreme-sum/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 517,
    title: "Multiply",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00517-extreme-multiply/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 527,
    title: "Append to object",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00527-medium-append-to-object/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 529,
    title: "Absolute",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00529-medium-absolute/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 531,
    title: "String to Union",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00531-medium-string-to-union/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 533,
    title: "Concat",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00533-easy-concat/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 545,
    title: "printf",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00545-hard-printf/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 553,
    title: "Deep object to unique",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00553-hard-deep-object-to-unique/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 599,
    title: "Merge",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00599-medium-merge/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 612,
    title: "KebabCase",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00612-medium-kebabcase/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 645,
    title: "Diff",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00645-medium-diff/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 651,
    title: "Length of String 2",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00651-hard-length-of-string-2/README.md",
    hasJp: true,
    difficulty: "hard",
  },
  {
    number: 697,
    title: "Tag",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00697-extreme-tag/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 730,
    title: "Union to Tuple",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 734,
    title: "Inclusive Range",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00734-extreme-inclusive-range/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 741,
    title: "Sort",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00741-extreme-sort/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 847,
    title: "String Join",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00847-hard-string-join/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 869,
    title: "DistributeUnions",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00869-extreme-distributeunions/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 898,
    title: "Includes",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00898-easy-includes/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 925,
    title: "Assert Array Index",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00925-extreme-assert-array-index/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 949,
    title: "AnyOf",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00949-medium-anyof/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 956,
    title: "DeepPick",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/00956-hard-deeppick/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 1042,
    title: "IsNever",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 1097,
    title: "IsUnion",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01097-medium-isunion/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 1130,
    title: "ReplaceKeys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01130-medium-replacekeys/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 1290,
    title: "Pinia",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01290-hard-pinia/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 1367,
    title: "Remove Index Signature",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01367-medium-remove-index-signature/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 1383,
    title: "Camelize",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01383-hard-camelize/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 1978,
    title: "Percentage Parser",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/01978-medium-percentage-parser/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2059,
    title: "Drop String",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02059-hard-drop-string/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 2070,
    title: "Drop Char",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02070-medium-drop-char/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2257,
    title: "MinusOne",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02257-medium-minusone/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2595,
    title: "PickByType",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02595-medium-pickbytype/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2688,
    title: "StartsWith",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02688-medium-startswith/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2693,
    title: "EndsWith",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02693-medium-endswith/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2757,
    title: "PartialByKeys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02757-medium-partialbykeys/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2759,
    title: "RequiredByKeys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02759-medium-requiredbykeys/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2793,
    title: "Mutable",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2822,
    title: "Split",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02822-hard-split/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 2828,
    title: "ClassPublicKeys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02828-hard-classpublickeys/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 2852,
    title: "OmitByType",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02852-medium-omitbytype/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2857,
    title: "IsRequiredKey",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02857-hard-isrequiredkey/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 2946,
    title: "ObjectEntries",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02946-medium-objectentries/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 2949,
    title: "ObjectFromEntries",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/02949-hard-objectfromentries/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 3057,
    title: "Push",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03057-easy-push/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 3060,
    title: "Unshift",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03060-easy-unshift/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 3062,
    title: "Shift",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03062-medium-shift/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3188,
    title: "Tuple to Nested Object",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03188-medium-tuple-to-nested-object/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3192,
    title: "Reverse",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03192-medium-reverse/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3196,
    title: "Flip Arguments",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03196-medium-flip-arguments/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3243,
    title: "FlattenDepth",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03243-medium-flattendepth/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3312,
    title: "Parameters",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.md",
    hasJp: true,
    difficulty: "easy",
  },
  {
    number: 3326,
    title: "BEM style string",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03326-medium-bem-style-string/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 3376,
    title: "InorderTraversal",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/03376-medium-inordertraversal/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4037,
    title: "IsPalindrome",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04037-hard-ispalindrome/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 4179,
    title: "Flip",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04179-medium-flip/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4182,
    title: "Fibonacci Sequence",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4260,
    title: "文字の組み合わせ",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04260-medium-nomiwase/README.md",
    hasJp: true,
    difficulty: "medium",
  },
  {
    number: 4425,
    title: "Greater Than",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4471,
    title: "Zip",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04471-medium-zip/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4484,
    title: "IsTuple",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4499,
    title: "Chunk",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04499-medium-chunk/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4518,
    title: "Fill",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 4803,
    title: "Trim Right",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5117,
    title: "Without",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5140,
    title: "Trunc",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05140-medium-trunc/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5153,
    title: "IndexOf",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5181,
    title: "Mutable Keys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05181-hard-mutable-keys/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 5310,
    title: "Join",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05310-medium-join/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5317,
    title: "LastIndexOf",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05317-medium-lastindexof/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5360,
    title: "Unique",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05360-medium-unique/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 5423,
    title: "Intersection",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05423-hard-intersection/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 5821,
    title: "MapTypes",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/05821-medium-maptypes/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 6141,
    title: "Binary to Decimal",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/06141-hard-binary-to-decimal/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 6228,
    title: "JSON Parser",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/06228-extreme-json-parser/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 7258,
    title: "Object Key Paths",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 7544,
    title: "Construct Tuple",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/07544-medium-construct-tuple/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 7561,
    title: "Subtract",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/07561-extreme-subtract/README.md",
    hasJp: false,
    difficulty: "extreme",
  },
  {
    number: 8640,
    title: "Number Range",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/08640-medium-number-range/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 8767,
    title: "Combination",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/08767-medium-combination/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 8804,
    title: "Two Sum",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/08804-hard-two-sum/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 8987,
    title: "Subsequence",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/08987-medium-subsequence/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 9142,
    title: "CheckRepeatedChars",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09142-medium-checkrepeatedchars/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 9155,
    title: "ValidDate",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09155-hard-validdate/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 9160,
    title: "Assign",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09160-hard-assign/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 9286,
    title: "FirstUniqueCharIndex",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09286-medium-firstuniquecharindex/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 9384,
    title: "Maximum",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09384-hard-maximum/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 9775,
    title: "Capitalize Nest Object Keys",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09775-hard-capitalize-nest-object-keys/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 9896,
    title: "GetMiddleElement",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09896-medium-get-middle-element/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 9898,
    title: "Appear only once",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09898-medium-zhao-chu-mu-biao-shu-zu-zhong-zhi-chu-xian-guo-yi-ci-de-yuan-su/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 9989,
    title: "Count Element Number To Object",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/09989-medium-tong-ji-shu-zu-zhong-de-yuan-su-ge-shu/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 10969,
    title: "Integer",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/10969-medium-integer/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 13580,
    title: "Replace Union",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/13580-hard-replace-union/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 14080,
    title: "FizzBuzz",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/14080-hard-fizzbuzz/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 14188,
    title: "Run-length encoding",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/14188-hard-run-length-encoding/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 15260,
    title: "Tree path array",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/15260-hard-tree-path-array/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 16259,
    title: "ToPrimitive",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/16259-medium-to-primitive/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 17973,
    title: "DeepMutable",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/17973-medium-deepmutable/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 18142,
    title: "All",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/18142-medium-all/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 18220,
    title: "Filter",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/18220-medium-filter/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 19458,
    title: "SnakeCase",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/19458-hard-snakecase/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 21106,
    title: "Combination key type",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/21106-medium-zu-he-jian-lei-xing-combination-key-type/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 25170,
    title: "Replace First",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/25170-medium-replace-first/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 25270,
    title: "Transpose",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/25270-medium-transpose/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 25747,
    title: "IsNegativeNumber",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/25747-hard-isnegativenumber/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 26401,
    title: "JSON Schema to TypeScript",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/26401-medium-json-schema-to-typescript/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 27133,
    title: "Square",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/27133-medium-square/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 27152,
    title: "Triangular number",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/27152-medium-triangular-number/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 27862,
    title: "CartesianProduct",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/27862-medium-cartesianproduct/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 27932,
    title: "MergeAll",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/27932-medium-mergeall/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 27958,
    title: "CheckRepeatedTuple",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/27958-medium-checkrepeatedtuple/README.md",
    hasJp: false,
    difficulty: "medium",
  },
  {
    number: 28143,
    title: "OptionalUndefined",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/28143-hard-optionalundefined/README.md",
    hasJp: false,
    difficulty: "hard",
  },
  {
    number: 28333,
    title: "Public Type",
    link: "https://github.com/type-challenges/type-challenges/blob/main/questions/28333-medium-public-type/README.md",
    hasJp: false,
    difficulty: "medium",
  },
];

const result = [];
let current = 1;
for (const { number, title, link, hasJp, difficulty } of problems) {
  console.log(`${current++} / ${problems.length} - ${number} ${title}`);
  const playGround = (await fetch(`https://tsch.js.org/${number}/play`)).url;
  result.push({
    difficulty,
    number,
    title,
    hasJp,
    readme: link,
    playGround,
  });

  await new Promise((resolve) => setTimeout(resolve, 10000));
}

console.log(result);

writeFileSync("./scripts/problems.json", JSON.stringify(result, null, 2));

console.log("done");
