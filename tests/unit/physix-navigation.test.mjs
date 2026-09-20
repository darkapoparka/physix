import test from 'node:test';
import assert from 'node:assert/strict';
import {primaryDestinations, primarySection, safeCareReturn, careLoginHref, legacyCareDestination, bookingQuery, isCarePath} from '../../src/shared/physix/navigation.ts';
const id='10000000-0000-4000-8000-000000000001';
test('one ordered primary navigation, with no identity-dependent inputs',()=>{assert.deepEqual(primaryDestinations.map(x=>[x.label,x.href]),[['Home','/'],['Book','/book'],['My care','/care']]);});
test('all private care routes keep the same primary item',()=>{for(const p of ['/care','/care/programmes','/care/programmes/'+id,'/care/sessions/'+id,'/care/progress','/care/appointments','/login'])assert.equal(primarySection(p),'care');});
test('public booking and programme discovery do not pretend to be owned care',()=>{assert.equal(primarySection('/book'),'book');assert.equal(primarySection('/plans'),'home');});
test('private destination survives sign-in without query data',()=>{const to='/care/programmes/'+id;assert.equal(safeCareReturn(to),to);assert.equal(new URL(careLoginHref(to),'https://physix.test').searchParams.get('returnTo'),to);});
test('external, encoded, protocol-relative and malformed return targets fail closed',()=>{for(const to of ['https://evil.test','//evil.test','/\\evil.test','/care/../api','/care%2Fprogress','/care/progress?secret=x','javascript:alert(1)','/care/progress#x','/practitioner',['/care/progress'],null])assert.equal(safeCareReturn(to),'/care');});
test('unknown record paths are not accepted',()=>{for(const to of ['/care/hack','/care/sessions/no','/care/programmes/../../profile','/care/programmes/'+id+'/extra'])assert.equal(isCarePath(to),false);});
test('old root and programme URLs have a canonical destination',()=>{assert.equal(legacyCareDestination([]),'/care');assert.equal(legacyCareDestination(['plans']),'/care/programmes');assert.equal(legacyCareDestination(['plans',id]),'/care/programmes/'+id);});
test('old exercise and appointment bookmarks remain routable',()=>{assert.equal(legacyCareDestination(['sessions',id]),'/care/sessions/'+id);assert.equal(legacyCareDestination(['appointments']),'/care/appointments');assert.equal(legacyCareDestination(['book']),'/book');});
test('unknown legacy paths never become redirects',()=>{assert.equal(legacyCareDestination(['..','api']),null);assert.equal(legacyCareDestination(['plans','not-an-id']),null);});
test('legacy booking keeps public filters, not patient or slot fields',()=>{assert.equal(bookingQuery({service:'physiotherapy',mode:'online',startsAt:'private',patient:'private',returnTo:'//evil'}),'?service=physiotherapy&mode=online');assert.equal(bookingQuery({q:'x'.repeat(161),mode:['online']}),'');});

test('return paths reject trailing whitespace and line breaks',()=>{for(const to of ['/care\n','/care/progress\r\n',' /care','/care ']){assert.equal(isCarePath(to),false);assert.equal(safeCareReturn(to),'/care');}});
