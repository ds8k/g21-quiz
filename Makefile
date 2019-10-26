# Running `make` in the root will run the following command
.DEFAULT_GOAL:= install

# Adds the node_modules binarys to PATH for make commands
PATH := ./node_modules/.bin:$(PATH)
SHELL := /bin/bash

# Forwards ports for running on Android device
android-forward-ports:
	@-echo "Forward port 8081"
	@-adb reverse tcp:8081 tcp:8081
	@-echo "Forward port 9090"
	@-adb reverse tcp:9090 tcp:9090


# Generates an Android debug build apk
build-android-debug:
	@-echo "Building Android debug apk"
	@-cd android && ./gradlew assembleDebug


# Generates an Android release build apk
build-android-release:
	@-echo "Building Android release apk"
	@-cd android && ./gradlew assembleRelease


# Stops all running packagers and clears the simulator
clean:
	@-make stop clean-simulator --jobs
	@-echo "💣 Stop watching for changes"
	@-watchman watch-del-all > /dev/null


# Clears out any build files for both ios and android project directories
clean-build:
	@-echo "💣 Removing all build files for android and ios"
	@-rm -rf \
		$(TMPDIR)/react-* \
		$(TMPDIR)/metro-* \
		$(TMPDIR)/haste-*

clean-packager:
	@-rm -rf \
		$(TMPDIR)/metro-* \
		$(TMPDIR)/haste-*


# Performs a deep clean on the project, deleting all node_modules, build files, eslintcache, etc.
clean-deep:
	@-make clean clean-build --jobs
	@-echo "💣 Removing node_modules, eslintcache, package-lock"
	@-rm -rf \
		node_modules \
		.DS_STORE \
		.eslintcache \
		packge-lock.json


# This will clean the simulator by killing zombie process and the app itself
# https://gist.github.com/joemasilotti/8976081
clean-simulator:
	@-echo "💣 Killing the Simulator"
	@-ps aux | grep _sim | grep -v grep | awk '{print $2}' | xargs kill -9 2> /dev/null || true
	@-killall Simulator > /dev/null 2>&1 || true

config-dev:
	@-cp ./.env.dev ./.env

config-local:
	@-cp ./.env.local ./.env

# Installs project dependencies
install:
	@-make stop
	@-echo "Installing dependencies"
	@-yarn


# Runs lint on the project and reports any code warnings/errors
lint:
	@-echo "🧹 Linting the project"
	@-eslint '+(index).js' '+(metro.config).js' 'src/**/*.js?(x)'

#Runs lint-fix on the project to auto fix any code error
lint-fix:
	@-echo "🧹 Fixing issues at the project"
	@-prettier --write ./{src,__tests__,__mocks__}{,**,**/**,**/**/**,**/**/**/**}/*.{js,jsx}

# Opens the android folder within Android Studio if installed
open-android:
	@-echo "Opening Android project"
	@-open -a /Applications/Android\ Studio.app android


# Opens up the Xcode project if present
open-ios:
	@-echo "Opening iOS project"
	@-open ios/*.xcworkspace


# Opens the Simulator app
open-simulator:
	@-echo "Opening iOS Simulator"
	@-open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app


# Clears node_modules, project build files, then reinstalls dependencies
reinstall:
	@-make clean-deep install


# Runs the project on an attached Android device
run-android run-android-device:
	@-echo "Running Android debug build"
	@-make android-forward-ports
	@-npx react-native run-android


# Runs a release build of the project on an attached Android device
run-android-release:
	@-echo "Running Android release build"
	@-npx react-native run-android --variant=release


# Runs the project on an iOS simulator
run-ios run:
	@-echo "Running iOS debug build"
	@-npx react-native run-ios --simulator "iPhone 11"


# Runs the project on an attached iOS device
run-ios-device run-device:
	@-echo "Running iOS debug build on device"
	@-npx react-native run-ios --device


# Runs the project on the simulator in Release mode
run-ios-release:
	@-echo "Running iOS release build"
	@-npx react-native run-ios --configuration Release

run-storybook:
	yarn run storybook


# Opens dev menu on Android device manually so you don't have to shake it around
show-menu-android show-menu:
	@adb shell input keyevent KEYCODE_MENU


# Starts the RN packager
start:
	@-make stop
	@-echo "Starting RN packager"
	@-make android-forward-ports
	@-npx react-native start

start-clean:
	@-make stop
	@-echo "Starting RN packager"
	@-make android-forward-ports
	@-npx react-native start --reset-cache


# Kills all RN packagers
stop:
	@-npx react-native-kill-packager

storybook:
	yarn run toggle-storybook


# Installs or updates CocoaPods repo
pod-repo:
	@-bundle install && cd ios && pod repo update

test:
	@-jest

update-snaps:
	@-jest -u
