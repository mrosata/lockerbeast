import is from 'lockerbeast/utils/is';
import _ from 'lodash';

export const curry = _.curry;
// get :: Object -> Mixed
let get;
get = curry((obj, attr) => is.callable(obj.get) ? obj.get(attr) : obj[attr]);
// set :: Object ->
let set;
set = curry((obj, attr, val) => is.callable(obj.set) ? obj.set(attr, val) : obj[attr] = val);
// then :: Function -> Promise -> Promise
export const then = curry((fn, thenable) => thenable.then(fn));
// findFromStore :: Store -> String, String -> Promise
export const findFromStore = curry((store, recordType, id) => store.find(recordType, id));
// findRecord :: Store -> String, String -> Promise
export const findRecord = curry((store, recordType, id) => findFromStore(store, recordType, id));
// notEqual :: A, B -> Boolean
export const notEqual = curry((a, b) => a !== b);
// notEmpty :: Array|String|_ -> Boolean
export const notEmpty = curry((obj, item) => !!obj[item] && obj[item] !== 0);
// path :: Object, String -> Mixed
export const path = curry((o, p) => is.isFunction(o.get) ? o.get(p) : o[p]);
// mapPaths :: Object -> Function -> Array
export const mapPaths = curry((obj, fn) => (Object.keys(obj).map(key => [key, obj[key]])).map(fn));
// incBetween :: Number -> Boolean
export const incBetween = curry((testNumber, lte, gte) => +testNumber <= lte && +testNumber >= gte);
// objectPropertiesNotEmpty :: Object -> Boolean
export const noEmptyPaths = curry((obj) => Object.keys(obj).every(notEmpty(obj)));
// zip :: Array, Array -> 2DArray (note: this could be slow large arrays b/c slice() in map
export const zip = curry((ar1, ar2) => ar1.slice().map((item, ind) => [item, ar2.slice()[ind]]));
// trim :: String -> String
export const trim = curry((s) => s.toString().trim());
// capitalize :: String -> String
export const capitalize = (s) => `${s.substr(0,1).toUpperCase()}${s.substr(1)}`;
// format :: String -> String
export const formatStr = curry((s, ...args) => s.replace(/{(\d+)}/g, (m, n) => typeof args[n] !== 'undefined' ? args[n] : m));
// splitWords :: String -> Array
export const splitWords = curry((s) => !s ? [] : s.split(' '));
// joinWords :: Array -> String
export const joinWords = curry((a) => !a ? '' : trim(a.join(' ')));
// tail :: Array -> Array
export const tail = curry((a) => a.slice().splice(1));
// head :: Array -> Array
export const head = curry((a) => a.slice().splice(0, -1));
// firstItem :: Array -> Mixed
export const firstItem = curry((a) => a.length ? a.slice().splice(0,1)[0] : null);
// lastItem :: Array -> Mixed
export const lastItem = curry((a) => a.length ? a.slice().splice(-1, 1)[0] : null);
// htmlElem :: String -> HTMLElement
export const htmlElem = (sel) => document.querySelector(sel);
// insertHTML :: Elem String -> HTMLElement
export const setHTML = curry((elem, text) => typeof elem.html === "function" ? elem.html(text) : (elem.innerHTML = text));
// ifttt :: Condition Fn -> Fn()
export const ifttt = curry((condition, fn) => {if (!!condition) {return fn(condition);}});
// applyToFirstCallableFn :: Array Fn Fn -> Mixed
export const applyToFirstCallableFn = curry((context, args, fn1, fn2) => is.callable(fn1) ? fn1.apply(context, args) : fn2.apply(context, args));
// splitParagraphs :: String -> Array
export const splitParagraphs = (text) => text.split(/[\r\n]+/).filter((n) => !!n);
// toArray :: Mixed -> Array
export const toArray = (item) => is.array(item) ? item : [item];

export function process(fn, chunks, ind) {
  let chunk = chunks[ind];
  return _.isUndefined(chunk) ? void(0) : _.defer(_.partial(process, fn, chunks, ++ind)) && fn(chunk);
}
export const queryRecordBy = curry((store, recordType, property, value) =>
  store.query(recordType, {orderBy: property, equalTo: value}));

// findOrCreate
export const findOrCreate = curry(function _findOrCreate(store, recordTypeStr, recordId, defaultObj = {}) {
  return store.find(recordTypeStr, recordId)
    .catch(()=> {
      let rec = store.createRecord(recordTypeStr, defaultObj);
      return rec.save();
    });
});

export const pushHasManyToModel = curry(function (modelToSave, hasManyKey, valueToPush) {
  if (!get(modelToSave, hasManyKey)) {
    set(modelToSave, hasManyKey, [valueToPush]);
  } else {
    get(modelToSave, hasManyKey).pushObject(valueToPush);
  }
  return modelToSave.save();
});

export const setItemToModel = curry((modelToSave, keyToSet, valueToSet) => set(modelToSave, keyToSet, valueToSet));

export default {
  // Lambda functions
  get,
  set,
  then,
  findFromStore,
  findRecord,
  notEqual,
  notEmpty,
  path,
  mapPaths,
  incBetween,
  noEmptyPaths,
  zip,
  trim,
  splitWords,
  joinWords,
  formatStr,
  tail,
  head,
  firstItem,
  lastItem,
  htmlElem,
  setHTML,
  ifttt,
  splitParagraphs,
  toArray,

  // Slightly larger functions (or ember specific fns)
  process,
  applyToFirstCallableFn,
  pushHasManyToModel,
  findOrCreate,
  setItemToModel,

  // Lodash implementations
  partial: _.partial,
  curry: _.curry,
  seq: _.seq,
  chunk: _.chunk,
  defer: _.defer,
  find: _.find,
  findLast: _.findLast,
  filter: _.filter,
  where: _.where,
  sortBy: _.sortBy,
  sort: _.sort,
  pad: _.pad,
  _: _
};
