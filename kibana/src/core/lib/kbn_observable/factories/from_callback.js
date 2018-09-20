"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_observable_1 = require("../lib/is_observable");
const observable_1 = require("../observable");
/**
 * Creates an observable that calls the specified function with no arguments
 * when it is subscribed. The observerable will behave differently based on the
 * return value of the factory:
 *
 * - return `undefined`: observable will immediately complete
 * - returns observable: observerable will mirror the returned value
 * - otherwise: observable will emit the value and then complete
 *
 * @param {Function}
 * @returns {Observable}
 */
function $fromCallback(factory) {
    return new observable_1.Observable(observer => {
        const result = factory();
        if (result === undefined) {
            observer.complete();
        }
        else if (is_observable_1.isObservable(result)) {
            return result.subscribe(observer);
        }
        else {
            observer.next(result);
            observer.complete();
        }
    });
}
exports.$fromCallback = $fromCallback;
